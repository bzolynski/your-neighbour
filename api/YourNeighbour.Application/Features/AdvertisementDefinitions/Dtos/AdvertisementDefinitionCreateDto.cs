using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos
{
    public sealed class AdvertisementDefinitionCreateDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsInactive { get; set; }
    }
}
