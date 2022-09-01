using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Localizations.Commands.DeleteLocalization
{
    public sealed class DeleteLocalizationHandler : ICommandHandler<DeleteLocalizationCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteLocalizationHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteLocalizationCommand request, CancellationToken cancellationToken)
        {
            Localization localization = await applicationDbContext.Set<Localization>()
                .Include(x => x.Advertisements)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (localization is null)
                throw new StatusCodeException("Lokalizacja nie istnieje!", System.Net.HttpStatusCode.BadRequest);
            if (localization.IsPrimary)
                throw new StatusCodeException("Nie można usunąć podstawowej lokalizacji!", System.Net.HttpStatusCode.BadRequest);


            if (localization.Advertisements.Any())
                throw new StatusCodeException("Lokalizacja ma przypisane ogłoszenia!", System.Net.HttpStatusCode.BadRequest);
            applicationDbContext.Set<Localization>().Remove(localization);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
