using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Message : EntityBase
    {
        public string Content { get; set; }
        public User Sender { get; set; }
        public Chat Chat { get; set; }

        public int SenderId { get; set; }
        public int ChatId { get; set; }
    }
}
