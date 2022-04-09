using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemsListingByUser
{
    public sealed record GetItemsListingByUser(int UserId) : IQuery<IEnumerable<ItemListingDto>>;
}
