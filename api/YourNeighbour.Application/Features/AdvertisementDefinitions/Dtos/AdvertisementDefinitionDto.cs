using System;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos
{
    public sealed class AdvertisementDefinitionDto
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; }
    }
}
