using AutoMapper;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class AdvertisementMappingProfile : Profile
    {
        public AdvertisementMappingProfile()
        {
            CreateMap<Advertisement, CreateAdvertisementDto>()
                .ReverseMap();
        }
    }
}
