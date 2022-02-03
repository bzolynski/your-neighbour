using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Authentication.Commands.Logout
{
    public sealed record LogoutCommand(LogoutDto LogoutDto) : ICommand<bool>;
}
