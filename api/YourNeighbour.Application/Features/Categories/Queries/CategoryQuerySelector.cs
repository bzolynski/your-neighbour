using System.Linq;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries
{
    public static class CategoryQuerySelector
    {
        public static IQueryable<Category> ApplyQueryParams(this IQueryable<Category> query, CategoryQueryParams queryParams)
        {
            return query.IncludeIf(c => c.Definition, queryParams.IncludeDefinition)
                .IncludeIf(c => c.Parent, queryParams.IncludeParent)
                .IncludeIf(c => c.Children, queryParams.IncludeChildren);
        }
    }
}
