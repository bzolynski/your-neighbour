using System.Collections.Generic;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Chats.Dtos
{
    public sealed class ChatDto
    {
        public int Id { get; set; }
        public IEnumerable<UserDto> Users { get; set; }
        public MessageDto LastMessage { get; set; }
    }
}
