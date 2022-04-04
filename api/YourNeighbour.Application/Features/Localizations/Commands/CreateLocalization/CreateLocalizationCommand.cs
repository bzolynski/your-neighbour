using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization
{
    public sealed record CreateLocalizationCommand(LocalizationCreateDto LocalizationCreate) : ICommand<LocalizationDto>;
}
