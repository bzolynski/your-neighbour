using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.DeleteAdvertisement
{
    public sealed record DeleteAdvertisementCommand(int Id) : ICommand<bool>;
}
