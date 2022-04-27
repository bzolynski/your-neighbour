namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class LocalizationCreateDto
    {
        public string Address { get; set; }
        public CoordinatesDto Coordinates { get; set; }
    }
}
