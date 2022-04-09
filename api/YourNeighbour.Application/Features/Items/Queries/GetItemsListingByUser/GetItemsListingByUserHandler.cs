using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemsListingByUser
{
    public sealed class GetItemsListingByUserHandler : IQueryHandler<GetItemsListingByUser, IEnumerable<ItemListingDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetItemsListingByUserHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ItemListingDto>> Handle(GetItemsListingByUser request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<Item>()
                .Where(x => x.UserId == request.UserId)
                .ProjectTo<ItemListingDto>(mapper)
                .ToListAsync();
        }
    }
}
