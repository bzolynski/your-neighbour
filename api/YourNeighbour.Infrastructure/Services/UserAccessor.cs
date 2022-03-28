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
        public string GetUsername()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.GivenName) ?? string.Empty;
        }

        public string GetEmail()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email) ?? string.Empty;
        }
    }
}
