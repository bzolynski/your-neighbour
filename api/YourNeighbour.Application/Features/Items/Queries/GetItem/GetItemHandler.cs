using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetItem
{
    public sealed class GetItemHandler : IQueryHandler<GetItemQuery, ItemDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetItemHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<ItemDto> Handle(GetItemQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Item> query = applicationDbContext.Set<Item>()
                .IncludeIf(i => i.User, request.QueryParams.IncludeUser)
                .IncludeIf(i => i.Category, request.QueryParams.IncludeCategory)
                .IncludeIf(i => i.Images.TakeNullable(request.QueryParams.MaxImages), request.QueryParams.IncludeImages);

            Item item = await query.FirstOrDefaultAsync(i => i.Id == request.Id, cancellationToken);
            return mapper.Map<ItemDto>(item);
        }
    }
}
