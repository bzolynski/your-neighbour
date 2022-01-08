using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Mappings
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
