using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Application.Features.Authentication.Commands.Refresh
{
    public sealed record RefreshCommand(RefreshDto RefreshDto) : ICommand<AuthenticationDto>;
}
