using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Localizations.Queries.GetLocalizationsByUser
{
    public sealed class GetLocalizationsByUserHandler : IQueryHandler<GetLocalizationsByUserQuery, IEnumerable<LocalizationDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetLocalizationsByUserHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<LocalizationDto>> Handle(GetLocalizationsByUserQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<Localization>()
                .Where(x => x.UserId == request.UserId)
                .ProjectTo<LocalizationDto>(mapper)
                .ToListAsync();
        }
    }
}
