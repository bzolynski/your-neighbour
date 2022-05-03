using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetManyCategories
{
    public sealed record GetManyCategoriesQuery(CategoryQueryParams QueryParams) : IQuery<IEnumerable<CategoryDto>>;
}
