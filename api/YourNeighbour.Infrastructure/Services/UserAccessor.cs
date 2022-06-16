using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
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
        public string GetEmail()
        {
            return httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
        }
        public Guid GetJti()
        {
            string jti = httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtRegisteredClaimNames.Jti) ?? string.Empty;
            return Guid.Parse(jti);
        }
    }
}
