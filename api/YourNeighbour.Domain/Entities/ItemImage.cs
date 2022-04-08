using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class ItemImage : ImageBase
    {
        public Item Item { get; set; }
        public int ItemId { get; set; }
    }
}
