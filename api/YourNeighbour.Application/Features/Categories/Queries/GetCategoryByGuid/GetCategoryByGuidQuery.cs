using System;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategoryByGuid
{
    public sealed record GetCategoryByGuidQuery(Guid Guid, CategoryQueryParams QueryParams) : IQuery<CategoryDto>;
}
