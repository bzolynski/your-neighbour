using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChats
{
    public sealed class GetChatsHandler : IQueryHandler<GetChatsQuery, IEnumerable<ChatDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IUserAccessor userAccessor;

        public GetChatsHandler(IApplicationDbContext applicationDbContext, IUserAccessor userAccessor)
        {
            this.applicationDbContext = applicationDbContext;
            this.userAccessor = userAccessor;
        }
        public async Task<IEnumerable<ChatDto>> Handle(GetChatsQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<User>().Where(x => x.Email == userAccessor.GetEmail())
                .SelectMany(x => x.Chats)
                .Select(x => new ChatDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    // UserName = "TEMP USER NAME"
                }).ToListAsync();
        }
    }
}
