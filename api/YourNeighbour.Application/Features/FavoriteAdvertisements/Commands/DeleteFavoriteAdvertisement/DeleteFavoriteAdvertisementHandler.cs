using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.DeleteFavoriteAdvertisement
{
    public sealed class DeleteFavoriteAdvertisementHandler : ICommandHandler<DeleteFavoriteAdvertisementCommand, Unit>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteFavoriteAdvertisementHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<Unit> Handle(DeleteFavoriteAdvertisementCommand request, CancellationToken cancellationToken)
        {
            FavoriteAdvertisement favoriteAdvertisement = await applicationDbContext.Set<FavoriteAdvertisement>()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.AdvertisementId == request.AdvertisementId, cancellationToken);
            if (favoriteAdvertisement is null)
                throw new StatusCodeException("Ogłoszenie nie znajduje się w ulubionych!", System.Net.HttpStatusCode.NotFound);
            applicationDbContext.Remove(favoriteAdvertisement);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
