using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public sealed class FavoriteAdvertisement
    {
        public Advertisement Advertisement { get; set; }
        public User User { get; set; }

        public int UserId { get; set; }
        public int AdvertisementId { get; set; }
    }
}
