using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;
namespace YourNeighbour.Application.Features.Users.Queries.GetUser
{
    public sealed record GetUserQuery(int Id) : IQuery<UserDto>;
}
