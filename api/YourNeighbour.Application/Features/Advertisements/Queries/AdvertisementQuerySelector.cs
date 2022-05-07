using System.Linq;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries
{
    public static class AdvertisementQuerySelector
    {
        public static IQueryable<Advertisement> ApplySearchableQueryParams(this IQueryable<Advertisement> query, AdvertisementSearchableQueryParams queryParams)
        {
            return query.WhereIf(a => a.Item.Name.Contains(queryParams.Search), !queryParams.Search.IsNullOrWhiteSpace())
                .ApplyQueryParams(queryParams);
        }

        public static IQueryable<Advertisement> ApplyQueryParams(this IQueryable<Advertisement> query, AdvertisementQueryParams queryParams)
        {
            return query.Include(a => a.Item)
                    .ThenIncludeIf(i => i.Category, queryParams.IncludeCategory)
                .Include(a => a.Item)
                    .ThenIncludeIf(i => i.Images.Take(queryParams.MaxImages ?? int.MaxValue), queryParams.IncludeImages)
                .IncludeIf(a => a.User, queryParams.IncludeUser)
                .IncludeIf(a => a.Localization, queryParams.IncludeLocalization)
                .IncludeIf(a => a.Definition, queryParams.IncludeDefinition);
        }
    }
}
