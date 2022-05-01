using System;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Dtos
{
    public sealed class AdvertisementDto
    {
        public int Id { get; set; }
        public UserDto User { get; set; }
        public AdvertisementDefinitionDto Definition { get; set; }
        public LocalizationDto Localization { get; set; }
        public ItemDto Item { get; set; }
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
    }
}
