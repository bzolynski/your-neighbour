using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetManyByParent
{
    public sealed record GetManyByParentQuery(int Id, CategoryQueryParams QueryParams) : IQuery<IEnumerable<CategoryDto>>;
}
