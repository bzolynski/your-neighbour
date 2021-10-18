using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class CategoryDefinition : DefinitionBase
    {
        public CategoryDefinition()
        {
            Categories = new HashSet<Category>();
        }
        public ICollection<Category> Categories { get; private set; }
    }
}
