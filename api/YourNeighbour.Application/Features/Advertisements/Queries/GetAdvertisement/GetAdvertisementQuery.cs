using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetAdvertisement
{
    public sealed record GetAdvertisementQuery(int Id, AdvertisementQueryParams QueryParams) : IQuery<AdvertisementDto>;
}
