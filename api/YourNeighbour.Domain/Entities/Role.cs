using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities
{
    public class Role : EntityBase
    {
        public Role()
        {
            RoleUsers = new HashSet<UserRole>();
        }
        public string Name { get; set; }

        public ICollection<UserRole> RoleUsers { get; private set; }
    }
}
