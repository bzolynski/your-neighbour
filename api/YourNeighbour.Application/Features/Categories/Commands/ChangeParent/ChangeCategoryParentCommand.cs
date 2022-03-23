using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Categories.Commands.ChangeParent
{
    public sealed record ChangeCategoryParentCommand(int CategoryId, int ParentId) : ICommand<bool>;
}
