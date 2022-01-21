using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace YourNeighbour.Domain.Entities.Identity
{
    public class Role : IdentityRole<int>
    {
        public Role()
        {
            RoleUsers = new HashSet<UserRole>();
        }
        public Guid Guid { get; set; } = Guid.NewGuid();

        public ICollection<UserRole> RoleUsers { get; private set; }
    }
}
