using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class AdvertisementImage : ImageBase
    {
        public Advertisement Advertisement { get; set; }
        public int AdvertisementId { get; set; }
    }
}
