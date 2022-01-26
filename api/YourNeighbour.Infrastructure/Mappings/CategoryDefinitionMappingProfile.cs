using AutoMapper;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Infrastructure.Mappings
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
