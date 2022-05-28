using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Commands.UpdateCategory
{
    public sealed record UpdateCategoryCommand(int Id, UpdateCategoryDto CategoryDto) : ICommand<int>;
}
