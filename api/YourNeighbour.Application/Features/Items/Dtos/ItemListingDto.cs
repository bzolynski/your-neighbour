using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Items.Dtos
{
    public sealed class ItemListingDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryDto Category { get; set; }
    }
}
