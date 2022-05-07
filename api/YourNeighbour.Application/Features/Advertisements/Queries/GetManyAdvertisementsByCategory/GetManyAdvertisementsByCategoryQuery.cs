using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByCategory
{
    public sealed record GetManyAdvertisementsByCategoryQuery(int CategoryId, AdvertisementSearchableQueryParams QueryParams) : IQuery<IEnumerable<AdvertisementDto>>;
}
