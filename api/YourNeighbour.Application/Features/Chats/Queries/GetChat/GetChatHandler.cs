using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Chats.Queries.GetChat
{
    public sealed class GetChatHandler : IQueryHandler<GetChatQuery, ChatDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IUserAccessor userAccessor;

        public GetChatHandler(IApplicationDbContext applicationDbContext, IUserAccessor userAccessor)
        {
            this.applicationDbContext = applicationDbContext;
            this.userAccessor = userAccessor;
        }
        public async Task<ChatDto> Handle(GetChatQuery request, CancellationToken cancellationToken)
        {
            Chat chat = await applicationDbContext.Set<Chat>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (chat is null)
                throw new StatusCodeException("Wybrany czat nie istnieje.", System.Net.HttpStatusCode.NotFound);
            return new ChatDto
            {
                Id = chat.Id,
                Name = chat.Name
            };
        }
    }
}
