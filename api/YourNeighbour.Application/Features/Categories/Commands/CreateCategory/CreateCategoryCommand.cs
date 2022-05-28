using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Commands.CreateCategory
{
    public sealed record CreateCategoryCommand(CategoryCreateDto Category) : ICommand<int>;
}
