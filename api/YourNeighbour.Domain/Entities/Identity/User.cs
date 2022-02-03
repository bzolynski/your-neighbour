using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace YourNeighbour.Domain.Entities.Identity
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            UserRoles = new HashSet<UserRole>();
        }
        public Guid Guid { get; set; } = Guid.NewGuid();
        public bool RequiresData { get; set; } = true;

        public ICollection<UserRole> UserRoles { get; private set; }
    }
}
