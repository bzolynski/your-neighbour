namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class LocalizationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PostCode { get; set; }
        public string Address { get; set; }
        public string HouseNumber { get; set; }
        public string FlatNumber { get; set; }
        public string City { get; set; }
    }
}
