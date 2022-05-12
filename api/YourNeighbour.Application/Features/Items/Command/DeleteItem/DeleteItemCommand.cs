using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Items.Command.DeleteItem
{
    public sealed record DeleteItemCommand(int Id) : ICommand<bool>;

}
