using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Queries.GetManyAdvertisementDefinitions
{
    public sealed class GetManyAdvertisementDefinitionsHandler : IQueryHandler<GetManyAdvertisementDefinitionsQuery, IEnumerable<AdvertisementDefinitionDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyAdvertisementDefinitionsHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<AdvertisementDefinitionDto>> Handle(GetManyAdvertisementDefinitionsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<AdvertisementDefinition>()
                .ProjectTo<AdvertisementDefinitionDto>(mapper)
                .ToListAsync();
        }
    }
}
