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
        }
        public Guid Guid { get; set; } = Guid.NewGuid();

        public ICollection<UserRole> UserRoles { get; private set; }
    }
}
