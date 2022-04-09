using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetManyByUser
{
    public sealed record GetManyItemsByUserQuery(int UserId) : IQuery<IEnumerable<ItemDto>>;
}
