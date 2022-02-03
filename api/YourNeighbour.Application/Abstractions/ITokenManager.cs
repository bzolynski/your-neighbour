using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.Application.Abstractions
{
    public interface ITokenManager
    {
        string CreateAccessToken(User user);
        string CreateRefreshToken();
        bool ValidateAccessToken(string token);
        bool ValidateRefreshToken(string token);
    }
}
