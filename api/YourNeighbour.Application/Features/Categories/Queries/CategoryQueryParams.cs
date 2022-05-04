namespace YourNeighbour.Application.Features.Categories.Queries
{
    public sealed class CategoryQueryParams
    {
        public bool IncludeDefinition { get; set; }
        public bool IncludeParent { get; set; }
        public bool IncludeChildren { get; set; }
    }
}
