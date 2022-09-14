using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Commands.SetMainAdvertisementImage
{
    public sealed class SetMainAdvertisementImageHandler : ICommandHandler<SetMainAdvertisementImageCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public SetMainAdvertisementImageHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(SetMainAdvertisementImageCommand request, CancellationToken cancellationToken)
        {
            using (Microsoft.EntityFrameworkCore.Storage.IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync(cancellationToken))
            {
                try
                {
                    AdvertisementImage mainImage = await applicationDbContext.Set<AdvertisementImage>().FirstOrDefaultAsync(x => x.Main, cancellationToken);
                    if (mainImage is not null)
                    {
                        mainImage.Main = false;
                        applicationDbContext.Update(mainImage);
                    }

                    mainImage = await applicationDbContext.Set<AdvertisementImage>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                    mainImage.Main = true;
                    applicationDbContext.Update(mainImage);
                    await applicationDbContext.SaveChangesAsync(cancellationToken);
                    await transaction.CommitAsync(cancellationToken);
                }
                catch
                {
                    await transaction.RollbackAsync(cancellationToken);
                    throw;
                }
            }
            return true;
        }
    }
}
