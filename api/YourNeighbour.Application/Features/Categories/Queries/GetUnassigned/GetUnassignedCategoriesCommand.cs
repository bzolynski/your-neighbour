using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetUnassigned
{
    public sealed record GetUnassignedCategoriesCommand() : IQuery<IEnumerable<CategoryDto>>;
}
