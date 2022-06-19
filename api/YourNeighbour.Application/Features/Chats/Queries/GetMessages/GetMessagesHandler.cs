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
        private readonly IMapper mapper;

        public GetMessagesHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
        {
            List<Message> messages = await applicationDbContext.Set<Message>().Where(x => x.ChatId == request.ChatId).ToListAsync(cancellationToken);
            return mapper.Map<IEnumerable<MessageDto>>(messages);
        }
    }
}
