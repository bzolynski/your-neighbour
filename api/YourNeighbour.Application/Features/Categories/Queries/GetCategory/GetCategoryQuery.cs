using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategory
{
    public sealed record GetCategoryQuery(int Id, CategoryQueryParams QueryParams) : IQuery<CategoryDto>;
}
