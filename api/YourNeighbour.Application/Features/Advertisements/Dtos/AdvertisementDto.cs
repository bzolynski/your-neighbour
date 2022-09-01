using System;
using System.Collections.Generic;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Advertisements.Dtos
{
    public sealed class AdvertisementDto
    {
        public int Id { get; set; }
        public AdvertisementDefinitionDto Definition { get; set; }
        public LocalizationDto Localization { get; set; }
        public CategoryDto Category { get; set; }
        public DateTime DateCreated { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<ImageDto> Images { get; set; }

        public int DefinitionId { get; set; }
        public int LocalizationId { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
    }
}
