using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Authentication.Queries.GetCurrentUser
{
    public sealed record GetCurrentUserQuery() : IQuery<UserDto>;
}
