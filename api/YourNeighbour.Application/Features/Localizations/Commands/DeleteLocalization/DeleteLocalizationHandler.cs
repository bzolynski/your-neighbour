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
            Localization localization = await applicationDbContext.Set<Localization>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (localization is null)
                throw new StatusCodeException("Localization not found", System.Net.HttpStatusCode.BadRequest);
            applicationDbContext.Set<Localization>().Remove(localization);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
