using System.Linq;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Queries
{
    public static class ItemQuerySelector
    {
        public static IQueryable<Item> ApplyQueryParams(this IQueryable<Item> query, ItemQueryParams queryParams)
        {
            return query.IncludeIf(i => i.User, queryParams.IncludeUser)
                .IncludeIf(i => i.Category, queryParams.IncludeCategory)
                .IncludeIf(i => i.Images.Take(queryParams.MaxImages ?? int.MaxValue), queryParams.IncludeImages);
        }
    }
}
