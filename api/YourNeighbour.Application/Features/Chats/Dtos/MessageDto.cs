namespace YourNeighbour.Application.Features.Chats.Dtos
{
    public sealed class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string ChatName { get; set; }
        public string Content { get; set; }
    }
}
