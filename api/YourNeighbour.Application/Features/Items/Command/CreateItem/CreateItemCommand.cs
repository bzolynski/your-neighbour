using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Command.CreateItem
{
    public sealed record CreateItemCommand(ItemCreateDto ItemCreate) : ICommand<int>;
}
