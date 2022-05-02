using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Localizations.Queries.GetLocalization
{
    public sealed class GetLocalizationHandler : IQueryHandler<GetLocalizationQuery, LocalizationDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetLocalizationHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<LocalizationDto> Handle(GetLocalizationQuery request, CancellationToken cancellationToken)
        {
            Localization localization = await applicationDbContext.Set<Localization>().FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);
            return mapper.Map<LocalizationDto>(localization);
        }
    }
}
