using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities
{
    public class User : EntityBase
    {
        public User()
        {
            UserRoles = new HashSet<UserRole>();
        }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public ICollection<UserRole> UserRoles { get; private set; }
    }
}
