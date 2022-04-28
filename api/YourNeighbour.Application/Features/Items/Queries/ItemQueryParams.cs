namespace YourNeighbour.Application.Features.Items.Queries
{
    public sealed class ItemQueryParams
    {
        public bool IncludeCategory { get; set; }
        public bool IncludeUser { get; set; }
        public bool IncludeImages { get; set; }
        public int? MaxImages { get; set; }
    }
}
