using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Application.Features.Authentication.Queries.GetCurrentUser
{
    public sealed class GetCurrentUserHandler : IQueryHandler<GetCurrentUserQuery, UserDto>
    {
        private readonly IUserAccessor userAccessor;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public GetCurrentUserHandler(IUserAccessor userAccessor, UserManager<User> userManager, IMapper mapper)
        {
            this.userAccessor = userAccessor;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            string email = userAccessor.GetEmail();
            User user = await userManager.FindByEmailAsync(email);
            if (user is null)
                return null;
            return mapper.Map<UserDto>(user);
        }
    }
}
