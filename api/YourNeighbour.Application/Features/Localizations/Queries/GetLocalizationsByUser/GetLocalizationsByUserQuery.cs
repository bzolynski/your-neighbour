using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Application.Features.Localizations.Queries.GetLocalizationsByUser
{
    public sealed record GetLocalizationsByUserQuery(int UserId) : IQuery<IEnumerable<LocalizationDto>>;
}
