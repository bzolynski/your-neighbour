using System.Collections.Generic;
using YourNeighbour.Application.Features.Common.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Dtos
{
    public sealed class UpdateAdvertisementDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int DefinitionId { get; set; }
        public int LocalizationId { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<UpdateImageDto> Images { get; set; }
    }
}
