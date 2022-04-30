using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Commands.CreateAdvertisement
{
    public sealed record CreateAdvertisementCommand(CreateAdvertisementDto CreateDto, int UserId) : ICommand<int>;
}
