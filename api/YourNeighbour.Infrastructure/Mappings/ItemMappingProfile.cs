using AutoMapper;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class ItemMappingProfile : Profile
    {
        public ItemMappingProfile()
        {
            CreateMap<ItemCreateDto, Item>();
            CreateMap<ItemImage, ImageDto>()
                .ReverseMap();
            CreateMap<Item, ItemDto>();
            CreateMap<Item, ItemListingDto>();
            CreateMap<Item, ItemDetailsDto>();
        }
    }
}
