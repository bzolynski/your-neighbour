using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Domain.Entities
{
    public class Category : EntityBase
    {
        public Category()
        {
            Subcategories = new HashSet<Category>();
            Advertisements = new HashSet<Advertisement>();
        }

        public string Name { get; set; }
        public bool IsActive { get; set; }
        public CategoryDefinition Definition { get; set; }
        public Category Parent { get; set; }
        public ICollection<Category> Subcategories { get; }
        public ICollection<Advertisement> Advertisements { get; }

        public int DefinitionId { get; set; }
        public int? ParentId { get; set; }
    }
}
