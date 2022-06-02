using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Users.Dtos;

namespace YourNeighbour.Application.Features.Users.Commands
{
    public sealed record UpdateUserCommand(int Id, UpdateUserDto UserDto) : ICommand<int>;
}
