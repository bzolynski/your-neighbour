namespace YourNeighbour.Application.Features.Localizations.Dtos
{
    public sealed class LocalizationCreateDto
    {
        public int UserId { get; set; }
        public string Address { get; set; }
        public CoordinatesDto Coordinates { get; set; }
    }
}
