using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemDetails
{
    public sealed class GetItemDetailsHandler : IQueryHandler<GetItemDetailsQuery, ItemDetailsDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetItemDetailsHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<ItemDetailsDto> Handle(GetItemDetailsQuery request, CancellationToken cancellationToken)
        {
            Item item = await applicationDbContext.Set<Item>()
                .Include(x => x.Category)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return mapper.Map<ItemDetailsDto>(item);
        }
    }
}
