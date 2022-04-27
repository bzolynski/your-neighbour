using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Localization : EntityBase
    {
        public string Name { get; set; }
        public Coordinates Coordinates { get; set; }
        public User User { get; set; }

        public int UserId { get; set; }
    }
}
