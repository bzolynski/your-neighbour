using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.GetFavoriteAdvertisementsByUser
{
    public sealed class GetFavoriteAdvertisementsByUserHandler : IQueryHandler<GetFavoriteAdvertisementsByUserQuery, IEnumerable<FavoriteAdvertisementDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public GetFavoriteAdvertisementsByUserHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<IEnumerable<FavoriteAdvertisementDto>> Handle(GetFavoriteAdvertisementsByUserQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<FavoriteAdvertisement>().Where(x => x.UserId == request.Id)
                .Select(x => new FavoriteAdvertisementDto { AdvertisementId = x.AdvertisementId })
                .ToListAsync(cancellationToken);
        }
    }
}
