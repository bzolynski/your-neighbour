using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Localization : EntityBase
    {
        public string Address { get; set; }
        public Coordinates Coordinates { get; set; }
    }
}
