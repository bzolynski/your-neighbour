using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Command.UpdateItem
{
    public sealed record UpdateItemCommand(int Id, UpdateItemDto ItemDto) : ICommand<int>;
}
