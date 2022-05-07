using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisements
{
    public sealed class GetManyAdvertisementsHandler : IQueryHandler<GetManyAdvertisementsQuery, IEnumerable<AdvertisementDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyAdvertisementsHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<AdvertisementDto>> Handle(GetManyAdvertisementsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Advertisement> advertisements = await applicationDbContext.Set<Advertisement>()
                .ApplySearchableQueryParams(request.QueryParams)
                .ToListAsync();

            return mapper.Map<IEnumerable<AdvertisementDto>>(advertisements);
        }
    }
}
