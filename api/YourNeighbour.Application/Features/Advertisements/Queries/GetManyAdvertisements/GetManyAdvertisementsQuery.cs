using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisements
{
    public sealed record GetManyAdvertisementsQuery() : IQuery<IEnumerable<AdvertisementDto>>;
}
