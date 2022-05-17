using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemByAdvertisement
{
    public sealed class GetItemByAdvertisementHandler : IQueryHandler<GetItemByAdvertisementQuery, ItemDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetItemByAdvertisementHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<ItemDto> Handle(GetItemByAdvertisementQuery request, CancellationToken cancellationToken)
        {
            Item item = await applicationDbContext.Set<Advertisement>()
                .Where(a => a.Id == request.AdvertisementId)
                .Select(a => a.Item)
                .ApplyQueryParams(request.QueryParams)
                .FirstOrDefaultAsync(cancellationToken);
            return mapper.Map<ItemDto>(item);
        }
    }
}
