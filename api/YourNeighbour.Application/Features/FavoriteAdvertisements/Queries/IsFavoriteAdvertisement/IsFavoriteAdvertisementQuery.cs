using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.IsFavoriteAdvertisement
{
    public sealed record IsFavoriteAdvertisementQuery(int UserId, int AdvertisementId) : IQuery<bool>;
}
