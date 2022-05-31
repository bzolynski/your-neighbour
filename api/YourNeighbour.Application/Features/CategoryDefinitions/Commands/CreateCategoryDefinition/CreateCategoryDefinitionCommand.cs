using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed record CreateCategoryDefinitionCommand(CategoryDefinitionCreateDto CategoryDefinition) : ICommand<int>;
}
