using System.Collections.Generic;
using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public sealed class Localization : EntityBase
    {
        public Localization()
        {
            Advertisements = new HashSet<Advertisement>();
        }
        public string PostCode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string FlatNumber { get; set; }
        public string City { get; set; }
        public bool IsPrimary { get; set; }
        public User User { get; set; }
        public ICollection<Advertisement> Advertisements { get; private set; }

        public int UserId { get; set; }
    }
}
