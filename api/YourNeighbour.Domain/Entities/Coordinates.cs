using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Coordinates : EntityBase
    {
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}
