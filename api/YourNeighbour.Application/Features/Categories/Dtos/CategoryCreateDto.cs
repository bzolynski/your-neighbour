namespace YourNeighbour.Application.Features.Categories.Dtos
{
    public sealed class CategoryCreateDto
    {
        public int ParentId { get; set; }
        public string Name { get; set; }
        public int DefinitionId { get; set; }
        public bool IsActive { get; set; }
    }
}
