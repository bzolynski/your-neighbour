using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Items.Dtos
{
    public sealed class ItemDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CategoryDto Category { get; set; }
    }
}
