using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.CreateFavoriteAdvertisement
{
    public sealed class CreateFavoriteAdvertisementHandler : ICommandHandler<CreateFavoriteAdvertisementCommand, Unit>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public CreateFavoriteAdvertisementHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<Unit> Handle(CreateFavoriteAdvertisementCommand request, CancellationToken cancellationToken)
        {
            FavoriteAdvertisement favoriteAdvertisement = await applicationDbContext.Set<FavoriteAdvertisement>()
                .FirstOrDefaultAsync(x => x.UserId == request.UserId && x.AdvertisementId == request.AdvertisementId, cancellationToken);
            if (favoriteAdvertisement is not null)
                throw new StatusCodeException("Ogłoszenie znajduje się już w ulubionych!", System.Net.HttpStatusCode.BadRequest);
            await applicationDbContext.AddAsync(new FavoriteAdvertisement
            {
                AdvertisementId = request.AdvertisementId,
                UserId = request.UserId
            }, cancellationToken);

            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
