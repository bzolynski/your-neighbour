using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class AdvertisementDefinition : DefinitionBase
    {
        public AdvertisementDefinition()
        {
            Advertisemens = new HashSet<Advertisement>();
        }
        public ICollection<Advertisement> Advertisemens { get; private set; }
    }
}
