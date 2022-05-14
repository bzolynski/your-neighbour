using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UpdateAdvertisement
{
    public sealed record UpdateAdvertisementCommand(int Id, UpdateAdvertisementDto AdvertisementDto) : ICommand<int>;
}
