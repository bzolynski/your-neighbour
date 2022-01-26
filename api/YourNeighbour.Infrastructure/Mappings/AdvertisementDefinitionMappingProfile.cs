using AutoMapper;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class AdvertisementDefinitionMappingProfile : Profile
    {
        public AdvertisementDefinitionMappingProfile()
        {
            CreateMap<AdvertisementDefinition, AdvertisementDefinitionDto>()
                .ReverseMap();

            CreateMap<AdvertisementDefinitionCreateDto, AdvertisementDefinition>();
        }
    }
}
