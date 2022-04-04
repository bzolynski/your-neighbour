using AutoMapper;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class LocalizationMappingProfile : Profile
    {
        public LocalizationMappingProfile()
        {
            CreateMap<LocalizationCreateDto, Localization>();
        }
    }
}
