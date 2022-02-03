using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

namespace YourNeighbour.Application.Features.Authentication.Commands.Refresh
{
    public sealed class RefreshHandler : ICommandHandler<RefreshCommand, AuthenticationDto>
    {
        private readonly ITokenManager tokenManager;
        private readonly IApplicationDbContext applicationDbContext;
        private readonly UserManager<User> userManager;
        private readonly AuthorizationOptions authorizationOptions;

        public RefreshHandler(ITokenManager tokenManager,
            IApplicationDbContext applicationDbContext,
            UserManager<User> userManager,
            IOptions<AuthorizationOptions> authorizationOptions
            )
        {
            this.tokenManager = tokenManager;
            this.applicationDbContext = applicationDbContext;
            this.userManager = userManager;
            this.authorizationOptions = authorizationOptions.Value;
        }
        public async Task<AuthenticationDto> Handle(RefreshCommand request, CancellationToken cancellationToken)
        {
            if (!tokenManager.ValidateRefreshToken(request.RefreshDto.RefreshToken))
                throw new AuthenticationException("Invalid token");

            RefreshToken oldRefreshToken = await applicationDbContext.Set<RefreshToken>()
                .SingleOrDefaultAsync(x => x.Token == request.RefreshDto.RefreshToken);
            if (oldRefreshToken is null || oldRefreshToken.Used || oldRefreshToken.Invalidated)
                throw new AuthenticationException("Invalid token");


            oldRefreshToken.Used = true;
            applicationDbContext.Set<RefreshToken>().Update(oldRefreshToken);

            string token = tokenManager.CreateRefreshToken();
            RefreshToken refreshToken = new RefreshToken
            {
                Token = token,
                UserGuid = oldRefreshToken.UserGuid,
                ExpiryDate = DateTime.Now.AddMinutes(authorizationOptions.RefreshTokenExpirationMinutes),
            };
            await applicationDbContext.Set<RefreshToken>().AddAsync(refreshToken);
            await applicationDbContext.SaveChangesAsync(cancellationToken);

            User user = await userManager.Users.SingleOrDefaultAsync(x => x.Guid == oldRefreshToken.UserGuid);

            return new AuthenticationDto
            {
                AccessToken = tokenManager.CreateAccessToken(user),
                RefreshToken = token
            };
        }
    }
}
