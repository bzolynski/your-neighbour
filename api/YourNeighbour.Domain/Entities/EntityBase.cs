using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities
{
    public class EntityBase
    {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
    }
}
