using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace YourNeighbour.Domain.Entities.Identity
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            UserRoles = new HashSet<UserRole>();
            Localizations = new HashSet<Localization>();
            Advertisements = new HashSet<Advertisement>();
            Chats = new HashSet<Chat>();
        }

        public Guid Guid { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<UserRole> UserRoles { get; private set; }
        public ICollection<Localization> Localizations { get; private set; }
        public ICollection<Advertisement> Advertisements { get; private set; }
        public ICollection<Chat> Chats { get; private set; }
    }
}
