using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChats
{
    public sealed record GetChatsQuery() : IQuery<IEnumerable<ChatDto>>;
}
