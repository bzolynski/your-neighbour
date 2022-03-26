using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Commands.ChangeParent
{
    public sealed class ChangeParentCategoryHandler : ICommandHandler<ChangeParentCategoryCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public ChangeParentCategoryHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(ChangeParentCategoryCommand request, CancellationToken cancellationToken)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                foreach (ChangeParentCategoryPairDto pair in request.ChangeParents)
                {
                    Category category = await applicationDbContext.Set<Category>().FindAsync(pair.ChildId);
                    category.ParentId = pair.ParentId;
                    applicationDbContext.Set<Category>().Update(category);
                }
                await applicationDbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            return true;
        }
    }
}
