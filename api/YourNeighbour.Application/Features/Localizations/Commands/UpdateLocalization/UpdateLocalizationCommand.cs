using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Localizations.Commands.UpdateLocalization
{
    public sealed record UpdateLocalizationCommand(int id, UpdateLocalizationDto LocalizationDto) : ICommand<int>;
}
