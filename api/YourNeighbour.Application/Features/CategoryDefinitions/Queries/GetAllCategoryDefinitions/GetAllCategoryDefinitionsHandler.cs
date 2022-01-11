using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetAllCategoryDefinitions
{
    public sealed class GetAllCategoryDefinitionsHandler : IQueryHandler<GetAllCategoryDefinitionsQuery, IEnumerable<CategoryDefinitionDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IObjectMapper mapper;

        public GetAllCategoryDefinitionsHandler(IApplicationDbContext applicationDbContext, IObjectMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDefinitionDto>> Handle(GetAllCategoryDefinitionsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<CategoryDefinition>()
                .ProjectTo<CategoryDefinitionDto>(mapper)
                .ToListAsync();
        }
    }
}
