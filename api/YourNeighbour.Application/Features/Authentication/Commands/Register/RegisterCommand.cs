using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Authentication.Commands.Register
{
    public sealed record RegisterCommand(RegisterDto RegisterDto) : ICommand<bool>;
}
