using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries.GetManyImagesByItem
{
    public sealed class GetManyImagesByItemHandler : IQueryHandler<GetManyImagesByItemQuery, IEnumerable<ImageDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyImagesByItemHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<ImageDto>> Handle(GetManyImagesByItemQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<ItemImage>()
                .Where(x => x.ItemId == request.Id)
                .ProjectTo<ImageDto>(mapper)
                .ToListAsync();
        }
    }
}
