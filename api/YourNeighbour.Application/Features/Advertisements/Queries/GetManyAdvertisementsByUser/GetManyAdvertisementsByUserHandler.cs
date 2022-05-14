using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByUser
{
    public sealed class GetManyAdvertisementsByUserHandler : IQueryHandler<GetManyAdvertisementsByUserQuery, IEnumerable<AdvertisementDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyAdvertisementsByUserHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<AdvertisementDto>> Handle(GetManyAdvertisementsByUserQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Advertisement> advertisements = await applicationDbContext.Set<Advertisement>()
                .Where(a => a.UserId == request.UserId)
                .ApplySearchableQueryParams(request.QueryParams)
                .ToListAsync(cancellationToken);
            return mapper.Map<IEnumerable<AdvertisementDto>>(advertisements);
        }
    }
}
