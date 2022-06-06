using MediatR;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.DeleteFavoriteAdvertisement
{
    public sealed record DeleteFavoriteAdvertisementCommand(int UserId, int AdvertisementId) : ICommand<Unit>;
}
