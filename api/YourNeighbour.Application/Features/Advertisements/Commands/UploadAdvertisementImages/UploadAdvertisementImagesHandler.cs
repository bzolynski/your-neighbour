using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UploadAdvertisementImages
{
    public sealed class UploadAdvertisementImagesHandler : ICommandHandler<UploadAdvertisementImagesCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public UploadAdvertisementImagesHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<int> Handle(UploadAdvertisementImagesCommand request, CancellationToken cancellationToken)
        {
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
                                // Upload the file if less than 2 MB
                                if (memoryStream.Length < 2097152)
                                {
                                    //based on the upload file to create Photo instance.
                                    //You can also check the database, whether the image exists in the database.
                                    AdvertisementImage newImage = await applicationDbContext.Set<AdvertisementImage>().FirstOrDefaultAsync(x => x.Bytes == memoryStream.ToArray(), cancellationToken);
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
                                        await applicationDbContext.AddAsync(newImage, cancellationToken);
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
                return 0;
            }
        }

    }
}
