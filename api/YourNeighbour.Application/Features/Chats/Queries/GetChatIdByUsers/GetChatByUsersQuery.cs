using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChatIdByUsers
{
    public sealed record GetChatIdByUsersQuery(IEnumerable<int> Ids) : IQuery<int>;
}
