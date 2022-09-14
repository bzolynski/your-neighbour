using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public sealed class AdvertisementImage : FileBase
    {
        public bool Main { get; set; }
        public Advertisement Advertisement { get; set; }
        public int AdvertisementId { get; set; }
    }
}
