using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UploadAdvertisementImages
{
    public sealed record UploadAdvertisementImagesCommand(int AdvertisementId, IFormFileCollection FormFileCollection) : ICommand<IEnumerable<AdvertisementImage>>;
}
