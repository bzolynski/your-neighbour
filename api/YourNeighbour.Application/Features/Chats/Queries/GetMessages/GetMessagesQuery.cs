using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;

namespace YourNeighbour.Application.Features.Chats.Queries.GetMessages
{
    public sealed record GetMessagesQuery(int ChatId) : IQuery<IEnumerable<MessageDto>>;
}
