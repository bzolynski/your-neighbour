using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Application.Features.Users.Queries.GetUser
{
    public sealed class GetUserHandler : IQueryHandler<GetUserQuery, UserDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetUserHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<UserDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            User user = await applicationDbContext.Set<User>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            return mapper.Map<UserDto>(user);
        }
    }
}
