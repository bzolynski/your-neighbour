using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Mappings
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
