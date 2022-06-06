using MediatR;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Localizations.Commands.SetPrimaryLocalization
{
    public record SetPrimaryLocalizationCommand(int Id) : ICommand<Unit>;
}
