namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class LocalizationCreateDto
    {
        public string Name { get; set; }
        public CoordinatesDto Coordinates { get; set; }
    }
}
