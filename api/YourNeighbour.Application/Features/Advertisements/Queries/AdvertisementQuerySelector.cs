using System.Linq;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries
{
    public static class AdvertisementQuerySelector
    {
        public static IQueryable<Advertisement> ApplySearchableQueryParams(this IQueryable<Advertisement> query, AdvertisementSearchableQueryParams queryParams)
        {
            return query.WhereIf(a => a.Item.Name.Contains(queryParams.Search) || a.Title.Contains(queryParams.Search), !queryParams.Search.IsNullOrWhiteSpace())
                .ApplyQueryParams(queryParams);
        }

        public static IQueryable<Advertisement> ApplyQueryParams(this IQueryable<Advertisement> query, AdvertisementQueryParams queryParams)
        {
            return query.IncludeIf(a => a.Item, queryParams.IncludeItem)
                    .ThenIncludeIf(i => i.Category, queryParams.IncludeItem && queryParams.IncludeCategory)
                .IncludeIf(a => a.Item, queryParams.IncludeItem)
                    .ThenIncludeIf(i => i.Images.Take(queryParams.MaxImages ?? int.MaxValue), queryParams.IncludeItem && queryParams.IncludeImages)
                .IncludeIf(a => a.User, queryParams.IncludeUser)
                .IncludeIf(a => a.Localization, queryParams.IncludeLocalization)
                .IncludeIf(a => a.Definition, queryParams.IncludeDefinition);
        }
    }
}
