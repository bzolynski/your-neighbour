using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Chats.Queries.GetMessages
{
    public sealed class GetMessagesHandler : IQueryHandler<GetMessagesQuery, IEnumerable<MessageDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IUserAccessor userAccessor;

        public GetMessagesHandler(IApplicationDbContext applicationDbContext, IUserAccessor userAccessor)
        {
            this.applicationDbContext = applicationDbContext;
            this.userAccessor = userAccessor;
        }
        public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<Message>().Where(x => x.ChatId == request.ChatId)
            .Select(x => new MessageDto
            {
                Id = x.Id,
                SenderId = x.SenderId,
                Content = x.Content,
                ChatName = x.Chat.Name
            }).ToListAsync(cancellationToken);
        }
    }
}
