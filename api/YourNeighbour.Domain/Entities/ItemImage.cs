namespace YourNeighbour.Domain.Entities
{
    public sealed class ItemImage : FileBase
    {
        public Item Item { get; set; }
        public int ItemId { get; set; }
    }
}
