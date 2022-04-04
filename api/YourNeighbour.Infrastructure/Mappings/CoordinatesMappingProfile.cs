using AutoMapper;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class CoordinatesMappingProfile : Profile
    {
        public CoordinatesMappingProfile()
        {
            CreateMap<Coordinates, CoordinatesDto>()
                .ReverseMap();
        }
    }
}
