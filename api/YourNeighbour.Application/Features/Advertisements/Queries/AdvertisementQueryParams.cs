namespace YourNeighbour.Application.Features.Advertisements.Queries
{
    public class AdvertisementQueryParams
    {
        public bool IncludeUser { get; set; }
        public bool IncludeLocalization { get; set; }
        public bool IncludeDefinition { get; set; }
        public bool IncludeCategory { get; set; }
        public bool IncludeImages { get; set; }
        public int? MaxImages { get; set; }
    }
    public class ManyAdvertisementsQueryParams : AdvertisementQueryParams
    {
        public int? Take { get; set; }
    }

    public class AdvertisementSearchableQueryParams : ManyAdvertisementsQueryParams
    {
        public string Search { get; set; }
    }
}
