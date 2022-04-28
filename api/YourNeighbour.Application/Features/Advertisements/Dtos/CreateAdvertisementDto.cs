namespace YourNeighbour.Application.Features.Advertisements.Dtos
{
    public sealed class CreateAdvertisementDto
    {
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int DefinitionId { get; set; }
        public int LocalizationId { get; set; }
        public int ItemId { get; set; }
    }
}
