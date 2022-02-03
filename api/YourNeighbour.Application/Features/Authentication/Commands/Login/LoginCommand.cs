using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Authentication.Commands.Login
{
    public sealed record LoginCommand(LoginDto LoginDto) : ICommand<AuthenticationDto>;
}
