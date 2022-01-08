using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Mappings
{
    public sealed class CategoryDefinitionMappingProfile : Profile
    {
        public CategoryDefinitionMappingProfile()
        {
            CreateMap<CategoryDefinition, CategoryDefinitionDto>()
                .ReverseMap();
            CreateMap<CategoryDefinitionCreateDto, CategoryDefinition>();
            CreateMap<CategoryDefinitionUpdateDto, CategoryDefinition>();
        }
    }
}
