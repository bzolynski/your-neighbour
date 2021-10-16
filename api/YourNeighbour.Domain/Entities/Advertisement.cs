using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities
{
    public class Advertisement : EntityBase
    {

        public DateTime DateCreated { get; set; }
        public Category Category { get; set; }

        public int CategoryId { get; set; }
    }
}
