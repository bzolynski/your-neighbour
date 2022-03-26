namespace YourNeighbour.Application.Features.Categories.Dtos
{
    public sealed class ChangeParentCategoryPairDto
    {
        public int ChildId { get; set; }
        public int? ParentId { get; set; }
    }
}
