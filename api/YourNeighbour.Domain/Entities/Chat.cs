using System.Collections.Generic;
using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Chat : EntityBase
    {
        public Chat()
        {
            Messages = new HashSet<Message>();
            Users = new HashSet<User>();
        }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
