using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Commands.ChangeParent
{
    public sealed record ChangeParentCategoryCommand(IEnumerable<ChangeParentCategoryPairDto> ChangeParents) : ICommand<bool>;
}
