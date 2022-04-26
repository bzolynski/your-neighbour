using System;
using System.Collections.Generic;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class CategoryDefinition : DefinitionBase
    {
        public static readonly Guid RootCategoryDefinitionGuid = new Guid("00000000-0000-0000-0000-000000000000");
        public CategoryDefinition()
        {
            Categories = new HashSet<Category>();
        }
        public bool Basic { get; set; } = false;
        public ICollection<Category> Categories { get; private set; }
    }
}
