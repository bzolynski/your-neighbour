namespace YourNeighbour.Application.Features.Categories.Dtos
{
    public sealed class UpdateCategoryDto
    {
        public string Name { get; set; }
        public int DefinitionId { get; set; }
        public bool IsActive { get; set; }
    }
}
