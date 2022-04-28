using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetItem
{
    public sealed record GetItemQuery(int Id, ItemQueryParams QueryParams) : IQuery<ItemDto>;
}
