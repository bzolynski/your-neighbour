using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UploadAdvertisementImages
{
    public sealed class UploadAdvertisementImagesHandler : ICommandHandler<UploadAdvertisementImagesCommand, IEnumerable<AdvertisementImage>>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public UploadAdvertisementImagesHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<IEnumerable<AdvertisementImage>> Handle(UploadAdvertisementImagesCommand request, CancellationToken cancellationToken)
        {
            List<AdvertisementImage> createdImages = new();
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync(cancellationToken))
            {
                try
                {
                    foreach (IFormFile formFile in request.FormFileCollection)
                    {
                        if (formFile.Length > 0)
                        {
                            using (MemoryStream memoryStream = new MemoryStream())
                            {
                                await formFile.CopyToAsync(memoryStream);
                                if (memoryStream.Length < 2097152)
                                {
                                    AdvertisementImage newImage = await applicationDbContext.Set<AdvertisementImage>()
                                        .FirstOrDefaultAsync(x => x.Bytes == memoryStream.ToArray() && x.AdvertisementId == request.AdvertisementId, cancellationToken);
                                    if (newImage is null)
                                    {
                                        newImage = new AdvertisementImage()
                                        {
                                            Bytes = memoryStream.ToArray(),
                                            Description = formFile.FileName,
                                            FileExtension = Path.GetExtension(formFile.FileName),
                                            Size = formFile.Length,
                                            AdvertisementId = request.AdvertisementId
                                        };
                                        EntityEntry<AdvertisementImage> createdEntity = await applicationDbContext.Set<AdvertisementImage>().AddAsync(newImage, cancellationToken);
                                        createdImages.Add(createdEntity.Entity);
                                    }
                                }
                                else
                                {
                                    throw new StatusCodeException("Jeden z plików przekroczył maksymalną wielkość 2MB", HttpStatusCode.BadRequest);
                                }
                            }
                        }
                    }
                    await applicationDbContext.SaveChangesAsync(cancellationToken);
                    await transaction.CommitAsync(cancellationToken);
                }
                catch
                {
                    await transaction.RollbackAsync(cancellationToken);
                    throw;
                }
                return createdImages;
            }
        }

    }
}
