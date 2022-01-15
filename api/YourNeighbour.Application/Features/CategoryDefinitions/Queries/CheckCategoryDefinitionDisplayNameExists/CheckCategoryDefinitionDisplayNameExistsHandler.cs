using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionDisplayNameExists
{
    public sealed class CheckCategoryDefinitionDisplayNameExistsHandler : IQueryHandler<CheckCategoryDefinitionDisplayNameExistsQuery, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public CheckCategoryDefinitionDisplayNameExistsHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(CheckCategoryDefinitionDisplayNameExistsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<CategoryDefinition>().FirstOrDefaultAsync(x => x.DisplayName == request.DisplayName) is not null;
        }
    }
}
