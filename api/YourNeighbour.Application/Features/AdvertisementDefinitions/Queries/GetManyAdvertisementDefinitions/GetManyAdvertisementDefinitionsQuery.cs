using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Queries.GetManyAdvertisementDefinitions
{
    public sealed record GetManyAdvertisementDefinitionsQuery() : IQuery<IEnumerable<AdvertisementDefinitionDto>>;
}
