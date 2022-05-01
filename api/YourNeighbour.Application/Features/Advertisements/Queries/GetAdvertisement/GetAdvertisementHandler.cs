using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
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
                .Include(a => a.Item)
                    .ThenIncludeIf(i => i.Category, request.QueryParams.IncludeCategory)
                .Include(a => a.Item)
                    .ThenIncludeIf(i => i.Images.Take(request.QueryParams.MaxImages ?? int.MaxValue), request.QueryParams.IncludeImages)
                .IncludeIf(a => a.User, request.QueryParams.IncludeUser)
                .IncludeIf(a => a.Localization, request.QueryParams.IncludeLocalization)
                .IncludeIf(a => a.Definition, request.QueryParams.IncludeDefinition)
                .FirstOrDefaultAsync(a => a.Id == request.Id);

            return mapper.Map<AdvertisementDto>(advertisement);
        }
    }
}
