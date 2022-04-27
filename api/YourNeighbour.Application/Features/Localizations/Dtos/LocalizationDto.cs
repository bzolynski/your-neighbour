namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class LocalizationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CoordinatesDto Coordinates { get; set; }
    }
}
