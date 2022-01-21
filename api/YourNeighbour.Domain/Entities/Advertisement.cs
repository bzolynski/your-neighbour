using System;
using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Definitions;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Domain.Entities
{
    public class Advertisement : EntityCustom
    {
        public User User { get; set; }
        public DateTime DateCreated { get; set; }
        public Category Category { get; set; }
        public AdvertisementDefinition Definition { get; set; }

        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int DefinitionId { get; set; }
    }
}
