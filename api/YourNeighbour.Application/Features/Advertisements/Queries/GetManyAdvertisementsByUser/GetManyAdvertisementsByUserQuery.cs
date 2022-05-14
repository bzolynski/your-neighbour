using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByUser
{
    public sealed record GetManyAdvertisementsByUserQuery(int UserId, AdvertisementSearchableQueryParams QueryParams) : IQuery<IEnumerable<AdvertisementDto>>;
}
