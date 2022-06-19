using AutoMapper;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Infrastructure.Mappings
{
    public sealed class MessageMappingProfile : Profile
    {
        public MessageMappingProfile()
        {
            CreateMap<Message, MessageDto>().ReverseMap();
        }
    }
}
