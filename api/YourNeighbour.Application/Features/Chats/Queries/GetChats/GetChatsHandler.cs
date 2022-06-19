using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChats
{
    public sealed class GetChatsHandler : IQueryHandler<GetChatsQuery, IEnumerable<ChatDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IUserAccessor userAccessor;
        private readonly IMapper mapper;

        public GetChatsHandler(IApplicationDbContext applicationDbContext, IUserAccessor userAccessor, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.userAccessor = userAccessor;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<ChatDto>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<User>().Where(x => x.Email == userAccessor.GetEmail())
                .SelectMany(x => x.Chats)
                .Select(x => new ChatDto
                {
                    Id = x.Id,
                    Users = mapper.Map<IEnumerable<UserDto>>(x.Users.Where(x => x.Email != userAccessor.GetEmail())),
                    LastMessage = mapper.Map<MessageDto>(x.Messages.LastOrDefault())
                }).ToListAsync();
        }
    }
}
