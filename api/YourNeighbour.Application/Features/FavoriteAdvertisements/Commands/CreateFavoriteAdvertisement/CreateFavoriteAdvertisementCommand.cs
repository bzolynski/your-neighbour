using MediatR;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.CreateFavoriteAdvertisement
{
    public sealed record CreateFavoriteAdvertisementCommand(int UserId, int AdvertisementId) : ICommand<Unit>;
}
