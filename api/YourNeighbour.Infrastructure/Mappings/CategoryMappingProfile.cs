using AutoMapper;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<Category, CategoryDto>()
                .ReverseMap();
            CreateMap<CategoryCreateDto, Category>()
                .ReverseMap();
        }
    }
}
