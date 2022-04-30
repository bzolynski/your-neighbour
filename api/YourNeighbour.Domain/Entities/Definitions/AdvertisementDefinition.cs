using System;
using System.Collections.Generic;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class AdvertisementDefinition : DefinitionBase
    {
        public static readonly Guid RootAdvertisementDefinitionGuid = new Guid("00000000-0000-0000-0000-000000000000");

        public AdvertisementDefinition()
        {
            Advertisements = new HashSet<Advertisement>();
        }
        public ICollection<Advertisement> Advertisements { get; private set; }
        public bool Basic { get; set; } = false;
    }
}
