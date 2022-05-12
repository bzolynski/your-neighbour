using System.Collections.Generic;
using YourNeighbour.Application.Features.Common.Dtos;

namespace YourNeighbour.Application.Features.Items.Dtos
{
    public sealed class UpdateItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public IEnumerable<UpdateImageDto> Images { get; set; }
    }
}
