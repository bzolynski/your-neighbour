using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemByAdvertisement
{
    public sealed record GetItemByAdvertisementQuery(int AdvertisementId, ItemQueryParams QueryParams) : IQuery<ItemDto>;
}
