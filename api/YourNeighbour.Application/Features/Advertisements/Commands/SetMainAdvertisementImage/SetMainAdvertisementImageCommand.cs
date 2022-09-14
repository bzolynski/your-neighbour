using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.SetMainAdvertisementImage
{
    public sealed record SetMainAdvertisementImageCommand(int Id) : ICommand<bool>;
}
