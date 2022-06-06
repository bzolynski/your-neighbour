using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.IsFavoriteAdvertisement
{
    public sealed class IsFavoriteAdvertisementHandler : IQueryHandler<IsFavoriteAdvertisementQuery, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public IsFavoriteAdvertisementHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(IsFavoriteAdvertisementQuery request, CancellationToken cancellationToken)
        {
            FavoriteAdvertisement favoriteAdvertisement = await applicationDbContext.Set<FavoriteAdvertisement>()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.AdvertisementId == request.AdvertisementId, cancellationToken);
            return favoriteAdvertisement is not null;
        }
    }
}
