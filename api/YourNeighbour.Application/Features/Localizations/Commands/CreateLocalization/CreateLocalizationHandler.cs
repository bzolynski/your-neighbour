using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization
{
    public sealed class CreateLocalizationHandler : ICommandHandler<CreateLocalizationCommand, LocalizationDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateLocalizationHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<LocalizationDto> Handle(CreateLocalizationCommand request, CancellationToken cancellationToken)
        {
            Localization localization = mapper.Map<Localization>(request.LocalizationCreate);
            localization.UserId = request.UserId;
            EntityEntry<Localization> result = await applicationDbContext.Set<Localization>().AddAsync(localization);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return mapper.Map<LocalizationDto>(result.Entity);
        }
    }
}
