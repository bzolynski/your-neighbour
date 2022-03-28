using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Options;

namespace YourNeighbour.Infrastructure.Services
{
    public sealed class TokenManager : ITokenManager
    {
        private readonly AuthorizationOptions authorizationOptions;
        private readonly IHttpContextAccessor httpContextAccessor;

        public TokenManager(
            IOptions<AuthorizationOptions> authorizationOptions,
            IHttpContextAccessor httpContextAccessor)
        {
            this.authorizationOptions = authorizationOptions.Value;
            this.httpContextAccessor = httpContextAccessor;
        }

        public string CreateAccessToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authorizationOptions.AccessTokenKey));
            return GenerateToken(key, DateTime.Now.AddMinutes(authorizationOptions.AccessTokenExpirationMinutes), claims);
        }

        public string CreateRefreshToken()
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authorizationOptions.RefreshTokenKey));
            return GenerateToken(key, DateTime.Now.AddMinutes(authorizationOptions.RefreshTokenExpirationMinutes));
        }

        private string GenerateToken(SymmetricSecurityKey key, DateTime expirationTime, IEnumerable<Claim>? claims = null)
        {
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expirationTime,
                SigningCredentials = credentials,
                Issuer = authorizationOptions.Issuer,
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateAccessToken(string token)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authorizationOptions.AccessTokenKey));
            return ValidateToken(token, key);
        }

        public bool ValidateRefreshToken(string token)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authorizationOptions.RefreshTokenKey));
            return ValidateToken(token, key);
        }

        private bool ValidateToken(string token, SymmetricSecurityKey key)
        {
            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidIssuer = authorizationOptions.Issuer,
                ValidateIssuer = true,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
