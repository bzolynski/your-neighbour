namespace YourNeighbour.Application.Features.Advertisements.Queries
{
    public sealed class AdvertisementQueryParams
    {
        public bool IncludeUser { get; set; }
        public bool IncludeLocalization { get; set; }
        public bool IncludeDefinition { get; set; }
        public bool IncludeCategory { get; set; }
        public bool IncludeImages { get; set; }
        public int? MaxImages { get; set; }
    }
}
