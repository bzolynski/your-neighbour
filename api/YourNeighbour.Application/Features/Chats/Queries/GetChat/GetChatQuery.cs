using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChat
{
    public sealed record GetChatQuery(int Id) : IQuery<ChatDto>;
}
