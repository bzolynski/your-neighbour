using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Exceptions;
using YourNeighbour.Domain.Options;

namespace YourNeighbour.Application.Features.Authentication.Commands.Login
{
    public sealed class LoginHandler : ICommandHandler<LoginCommand, AuthenticationDto>
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenManager tokenService;
        private readonly IApplicationDbContext applicationDbContext;
        private readonly AuthorizationOptions authorizationOptions;

        public LoginHandler(UserManager<User> userManager,
            ITokenManager tokenService,
            IApplicationDbContext applicationDbContext,
            IOptions<AuthorizationOptions> authorizationOptions
            )
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.applicationDbContext = applicationDbContext;
            this.authorizationOptions = authorizationOptions.Value;
        }
        public async Task<AuthenticationDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            User user = await userManager.FindByEmailAsync(request.LoginDto.Login) ?? await userManager.FindByNameAsync(request.LoginDto.Login);
            if (user is null)
                throw new AuthenticationException("Wrong username or password");

            if (!await userManager.CheckPasswordAsync(user, request.LoginDto.Password))
                throw new AuthenticationException("Wrong username or password");

            string token = tokenService.CreateRefreshToken();
            RefreshToken refreshToken = new RefreshToken
            {
                Token = token,
                UserGuid = user.Guid,
                ExpiryDate = DateTime.Now.AddMinutes(authorizationOptions.RefreshTokenExpirationMinutes)
            };
            await applicationDbContext.Set<RefreshToken>().AddAsync(refreshToken);
            await applicationDbContext.SaveChangesAsync(cancellationToken);

            return new AuthenticationDto
            {
                AccessToken = tokenService.CreateAccessToken(user),
                RefreshToken = token
            };
        }
    }
}
