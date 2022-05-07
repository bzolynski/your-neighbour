using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetAdvertisement
{
    public sealed class GetAdvertisementHandler : IQueryHandler<GetAdvertisementQuery, AdvertisementDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetAdvertisementHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<AdvertisementDto> Handle(GetAdvertisementQuery request, CancellationToken cancellationToken)
        {
            Advertisement advertisement = await applicationDbContext.Set<Advertisement>()
                .ApplyQueryParams(request.QueryParams)
                .FirstOrDefaultAsync(a => a.Id == request.Id);

            return mapper.Map<AdvertisementDto>(advertisement);
        }
    }
}
