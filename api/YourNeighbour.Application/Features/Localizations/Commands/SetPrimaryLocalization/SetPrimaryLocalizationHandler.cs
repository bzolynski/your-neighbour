using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Localizations.Commands.SetPrimaryLocalization
{
    public sealed class SetPrimaryLocalizationHandler : ICommandHandler<SetPrimaryLocalizationCommand, Unit>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public SetPrimaryLocalizationHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<Unit> Handle(SetPrimaryLocalizationCommand request, CancellationToken cancellationToken)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync(cancellationToken))
            {
                Localization newPrimary = await applicationDbContext.Set<Localization>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                if (newPrimary is null)
                    throw new StatusCodeException("Lokalizacja nie istnieje!", System.Net.HttpStatusCode.NotFound);
                newPrimary.IsPrimary = true;
                Localization oldPrimary = await applicationDbContext.Set<Localization>().FirstOrDefaultAsync(x => x.IsPrimary && x.UserId == newPrimary.UserId);
                if (oldPrimary is not null)
                {
                    oldPrimary.IsPrimary = false;
                    applicationDbContext.Update(oldPrimary);
                }
                applicationDbContext.Update(newPrimary);
                await applicationDbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            return Unit.Value;
        }
    }
}
