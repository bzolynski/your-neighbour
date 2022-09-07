namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class UpdateLocalizationDto
    {
        public string PostCode { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string FlatNumber { get; set; }
        public string City { get; set; }
        public bool IsPrimary { get; set; }

    }
}
