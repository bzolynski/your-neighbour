using System.Collections.Generic;
using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Item : EntityBase
    {
        public Item()
        {
            Images = new HashSet<ItemImage>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
        public ICollection<ItemImage> Images { get; private set; }

        public int CategoryId { get; set; }
    }
}
