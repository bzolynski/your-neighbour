using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChatIdByUsers
{
    public sealed class GetChatIdByUsersHandler : IQueryHandler<GetChatIdByUsersQuery, int>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public GetChatIdByUsersHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<int> Handle(GetChatIdByUsersQuery request, CancellationToken cancellationToken)
        {
            Chat chat = await applicationDbContext.Set<Chat>().FirstOrDefaultAsync(x => x.Users.Count == request.Ids.Count() && x.Users.All(user => request.Ids.Any(id => id == user.Id)), cancellationToken);
            if (chat is null)
                throw new StatusCodeException("Nie znaleziono czatu.", System.Net.HttpStatusCode.NotFound);
            return chat.Id;
        }

    }
}
