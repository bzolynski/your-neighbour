using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Localizations.Queries.GetLocalization
{
    public sealed record GetLocalizationQuery(int Id) : IQuery<LocalizationDto>;
}
