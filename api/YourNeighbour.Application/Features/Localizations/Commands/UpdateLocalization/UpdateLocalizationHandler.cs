using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Localizations.Commands.UpdateLocalization
{
    public sealed class UpdateLocalizationHandler : ICommandHandler<UpdateLocalizationCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public UpdateLocalizationHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<int> Handle(UpdateLocalizationCommand request, CancellationToken cancellationToken)
        {
            Localization localization = await applicationDbContext.Set<Localization>().FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);
            if (localization is null)
                throw new StatusCodeException("Lokalizacja nie istnieje!", System.Net.HttpStatusCode.BadRequest);
            localization.Name = request.LocalizationDto.Name;
            localization.Street = request.LocalizationDto.Street;
            localization.PostCode = request.LocalizationDto.PostCode;
            localization.City = request.LocalizationDto.City;
            localization.HouseNumber = request.LocalizationDto.HouseNumber;
            localization.FlatNumber = request.LocalizationDto.FlatNumber;
            applicationDbContext.Set<Localization>().Update(localization);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return localization.Id;
        }
    }
}
