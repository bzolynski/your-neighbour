using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Categories.Commands.DeleteCategory
{
    public sealed class DeleteCategoryHandler : ICommandHandler<DeleteCategoryCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteCategoryHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync(cancellationToken))
            {
                try
                {
                    Category category = await applicationDbContext.Set<Category>().FirstOrDefaultAsync(x => x.Id == request.Id);
                    if (category is null)
                        return true;
                    bool hasAdvertisements = await applicationDbContext.Set<Advertisement>().AnyAsync(x => x.CategoryId == category.Id, cancellationToken);
                    if (hasAdvertisements)
                        throw new StatusCodeException("Nie można skasować kategorii ponieważ posiada przypisane ogłoszenia!", System.Net.HttpStatusCode.BadRequest);

                    string selectCategoriesWithAdvertisementsQuery = @"WITH tree (Id, Name, IsActive, Basic, DefinitionId, ParentId, Guid, AdvertisementId) as 
                                    (
                                       SELECT c.Id, c.Name, c.IsActive, c.Basic, c.DefinitionId, c.ParentId, c.Guid, ad1.Id
                                       FROM categories c
	                                    OUTER APPLY (select a.Id from advertisements a where c.id = a.CategoryId) ad1
                                       WHERE ParentId = {0}

                                       UNION ALL

                                       SELECT c2.Id, c2.Name, c2.IsActive, c2.Basic, c2.DefinitionId, c2.ParentId, c2.Guid, ad2.id
                                       FROM categories c2 
	                                    INNER JOIN tree ON tree.id = c2.parentid
	                                    OUTER APPLY (select a2.id from advertisements a2 where c2.id = a2.CategoryId) ad2
	
                                    )
                                    SELECT TOP 1 *
                                    FROM tree where AdvertisementId is not null;

                    ";

                    Category childWithAdvertisement = (await applicationDbContext.Set<Category>().FromSqlRaw(selectCategoriesWithAdvertisementsQuery, category.Id)
                            .AsNoTrackingWithIdentityResolution()
                            .ToListAsync())
                        .FirstOrDefault();
                    if (childWithAdvertisement is not null)
                        throw new StatusCodeException($"Nie można skasować kategorii ponieważ podkategoria \"{childWithAdvertisement.Name}\" posiada przypisane ogłoszenia!", System.Net.HttpStatusCode.BadRequest);
                    string selectChildCategoriesQuery = @"WITH tree(Id, Name, IsActive, Basic, DefinitionId, ParentId, Guid) as
                                                         (
                                                             SELECT c.Id, c.Name, c.IsActive, c.Basic, c.DefinitionId, c.ParentId, c.Guid
                                                             FROM categories c
                                                             WHERE ParentId = {0}
                                                        
                                                             UNION ALL
                                                        
                                                             SELECT c2.Id, c2.Name, c2.IsActive, c2.Basic, c2.DefinitionId, c2.ParentId, c2.Guid
                                                             FROM categories c2
                                                        
                                                             INNER JOIN tree ON tree.id = c2.parentid
	                                                    
                                                         )
                                                         SELECT * FROM tree

                    ";

                    IQueryable<Category> categoriesToDelete = applicationDbContext.Set<Category>().FromSqlRaw(selectChildCategoriesQuery, category.Id)
                            .AsNoTrackingWithIdentityResolution();
                    applicationDbContext.Set<Category>().RemoveRange(categoriesToDelete);
                    applicationDbContext.Set<Category>().Remove(category);
                    int changes = await applicationDbContext.SaveChangesAsync(cancellationToken);
                    await transaction.CommitAsync(cancellationToken);
                    return changes > 0;
                }
                catch
                {
                    await transaction.RollbackAsync(cancellationToken);
                    throw;
                }
            }

        }

        private bool xxx(Category arg, int parentId)
        {
            if (arg.Id != parentId)
                throw new StatusCodeException($"Nie można skasować kategorii ponieważ podkategoria {arg.Name} posiada przypisane ogłoszenia.", System.Net.HttpStatusCode.BadRequest);
            return arg.Children.Any(x => xxx(x, parentId));
        }
    }
}
