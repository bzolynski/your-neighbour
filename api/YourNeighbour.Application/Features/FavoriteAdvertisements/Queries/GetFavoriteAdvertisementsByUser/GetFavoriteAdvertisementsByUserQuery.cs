using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Dtos;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.GetFavoriteAdvertisementsByUser
{
    public sealed record GetFavoriteAdvertisementsByUserQuery(int Id) : IQuery<IEnumerable<FavoriteAdvertisementDto>>;
}
