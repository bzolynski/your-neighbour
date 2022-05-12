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
            CreateMap<Item, ItemDto>();
            CreateMap<ItemCreateDto, Item>();
            CreateMap<UpdateItemDto, Item>();
            CreateMap<ItemImage, ImageDto>();
            CreateMap<CreateImageDto, ItemImage>();
        }
    }
}
