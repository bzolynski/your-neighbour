using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.DeleteAdvertisementImage
{
    public record class DeleteAdvertisementImageCommand(int Id) : ICommand<bool>;
}
