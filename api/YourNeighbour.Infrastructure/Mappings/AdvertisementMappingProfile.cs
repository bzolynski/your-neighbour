using AutoMapper;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class AdvertisementMappingProfile : Profile
    {
        public AdvertisementMappingProfile()
        {
            CreateMap<CreateAdvertisementDto, Advertisement>();
            CreateMap<Advertisement, AdvertisementDto>();
            CreateMap<AdvertisementImage, ImageDto>();
            CreateMap<CreateImageDto, AdvertisementImage>();
        }
    }
}
