using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Localizations.Commands.DeleteLocalization
{
    public sealed record DeleteLocalizationCommand(int Id) : ICommand<bool>;
}
