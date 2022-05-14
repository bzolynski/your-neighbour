using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.DeleteAdvertisement
{
    public sealed class DeleteAdvertisementHandler : ICommandHandler<DeleteAdvertisementCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteAdvertisementHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteAdvertisementCommand request, CancellationToken cancellationToken)
        {
            Advertisement advertisement = await applicationDbContext.Set<Advertisement>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (advertisement is null)
                throw new StatusCodeException("Advertisement does not exists!", System.Net.HttpStatusCode.BadRequest);
            applicationDbContext.Set<Advertisement>().Remove(advertisement);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
