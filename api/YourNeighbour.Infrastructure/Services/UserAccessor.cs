using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Infrastructure.Services
{
    public sealed class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }
        public string GetUsername()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(JwtRegisteredClaimNames.Name) ?? string.Empty;
        }

        public string GetEmail()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(JwtRegisteredClaimNames.Email) ?? string.Empty;
        }
    }
}
