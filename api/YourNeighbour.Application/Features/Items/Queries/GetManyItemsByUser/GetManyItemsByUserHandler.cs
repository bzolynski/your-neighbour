using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Items.Queries.GetManyByUser;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetManyItemsByUser
{
    public sealed class GetManyItemsByUserHandler : IQueryHandler<GetManyItemsByUserQuery, IEnumerable<ItemDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyItemsByUserHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<ItemDto>> Handle(GetManyItemsByUserQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Item> query = applicationDbContext.Set<Item>()
                .IncludeIf(i => i.User, request.QueryParams.IncludeUser)
                .IncludeIf(i => i.Category, request.QueryParams.IncludeCategory)
                .IncludeIf(i => i.Images.TakeNullable(request.QueryParams.MaxImages), request.QueryParams.IncludeImages);

            IEnumerable<Item> items = await query.Where(x => x.UserId == request.UserId).ToListAsync();
            return mapper.Map<IEnumerable<ItemDto>>(items);
        }
    }
}
