using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
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
                Category category = await applicationDbContext.Set<Category>().FindAsync(request.Id);
                category.ParentId = request.ParentId;
                applicationDbContext.Set<Category>().Update(category);
                await applicationDbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            return true;
        }
    }
}
