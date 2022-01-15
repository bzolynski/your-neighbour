using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionNameExists
{
    public sealed class CheckCategoryDefinitionNameExistsHandler : IQueryHandler<CheckCategoryDefinitionNameExistsQuery, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public CheckCategoryDefinitionNameExistsHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(CheckCategoryDefinitionNameExistsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<CategoryDefinition>().FirstOrDefaultAsync(x => x.Name == request.Name) is not null;
        }
    }
}
