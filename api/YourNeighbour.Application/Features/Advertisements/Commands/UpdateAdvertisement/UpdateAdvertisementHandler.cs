using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UpdateAdvertisement
{
    public sealed class UpdateAdvertisementHandler : ICommandHandler<UpdateAdvertisementCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public UpdateAdvertisementHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<int> Handle(UpdateAdvertisementCommand request, CancellationToken cancellationToken)
        {
            Advertisement advertisement = await applicationDbContext.Set<Advertisement>()
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (advertisement is null)
                throw new StatusCodeException("Advertisement does not exists!");

            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                advertisement.DefinitionId = request.AdvertisementDto.DefinitionId;
                advertisement.LocalizationId = request.AdvertisementDto.LocalizationId;
                advertisement.Title = request.AdvertisementDto.Title;
                advertisement.Description = request.AdvertisementDto.Description;
                advertisement.CategoryId = request.AdvertisementDto.CategoryId;

                //List<AdvertisementImage> images = await applicationDbContext.Set<AdvertisementImage>()
                //    .Where(i => i.AdvertisementId == request.Id)
                //    .ToListAsync();

                //foreach (UpdateImageDto img in request.AdvertisementDto.Images)
                //{
                //    if (!Guid.TryParse(img.Guid, out Guid guid) || guid == Guid.Empty)
                //        applicationDbContext.Set<AdvertisementImage>().Add(new AdvertisementImage { DataUrl = img.DataUrl, AdvertisementId = request.Id });
                //    else
                //        images.Remove(images.First(x => x.Guid == guid));
                //}
                //applicationDbContext.Set<AdvertisementImage>().RemoveRange(images);
                await applicationDbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }

            return request.Id;
        }
    }
}
