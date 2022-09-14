using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Categories.Commands.ChangeParent
{
    public sealed record ChangeParentCategoryCommand(int Id, int ParentId) : ICommand<bool>;
}
