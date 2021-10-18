using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Domain.Entities
{
    public class Advertisement : EntityBase
    {
        public User User { get; set; }
        public DateTime DateCreated { get; set; }
        public Category Category { get; set; }
        public AdvertisementDefinition Definition { get; set; }

        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int DefinitionId { get; set; }
    }
}
