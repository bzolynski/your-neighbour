using System;
using System.Collections.Generic;
using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Definitions;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public class Advertisement : EntityBase
    {
        public Advertisement()
        {
            Images = new HashSet<AdvertisementImage>();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public AdvertisementDefinition Definition { get; set; }
        public Localization Localization { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
        public ICollection<AdvertisementImage> Images { get; private set; }

        public int UserId { get; set; }
        public int DefinitionId { get; set; }
        public int LocalizationId { get; set; }
        public int CategoryId { get; set; }
    }
}
