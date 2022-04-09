using System.Collections.Generic;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Common.Dtos;

namespace YourNeighbour.Application.Features.Items.Dtos
{
    public sealed class ItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CategoryDto Category { get; set; }
        public IEnumerable<ImageDto> Images { get; set; }
    }
}
