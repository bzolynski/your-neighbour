using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition
{
    public sealed record UpdateCategoryDefinitionCommand(int Id, CategoryDefinitionUpdateDto CategoryDefinition) : ICommand<int>;
}
