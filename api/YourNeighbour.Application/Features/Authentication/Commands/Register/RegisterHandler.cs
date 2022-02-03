using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Authentication.Commands.Register
{
    public sealed class RegisterHandler : ICommandHandler<RegisterCommand, bool>
    {
        private readonly UserManager<User> userManager;

        public RegisterHandler(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            User user = new User
            {
                Email = request.RegisterDto.Email,
                UserName = request.RegisterDto.Email,
                RequiresData = true
            };

            IdentityResult result = await userManager.CreateAsync(user, request.RegisterDto.Password);

            if (!result.Succeeded)
                throw new AuthenticationException(result.Errors.Select(x => x.Description));

            return true;

        }
    }
}
