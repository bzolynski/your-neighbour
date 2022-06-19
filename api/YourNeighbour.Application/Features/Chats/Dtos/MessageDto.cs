using System;

namespace YourNeighbour.Application.Features.Chats.Dtos
{
    public sealed class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int ChatId { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }
    }
}
