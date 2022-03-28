using AutoMapper;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserDto>()
                .ReverseMap();

        }
    }
}
