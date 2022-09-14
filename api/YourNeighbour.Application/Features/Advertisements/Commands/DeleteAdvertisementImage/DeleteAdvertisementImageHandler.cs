using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.DeleteAdvertisementImage
{
    public sealed class DeleteAdvertisementImageHandler : ICommandHandler<DeleteAdvertisementImageCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteAdvertisementImageHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteAdvertisementImageCommand request, CancellationToken cancellationToken)
        {
            AdvertisementImage image = await applicationDbContext.Set<AdvertisementImage>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (image is null)
                throw new StatusCodeException("Podane zdjęcie nie istnieje!");
            applicationDbContext.Remove(image);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
