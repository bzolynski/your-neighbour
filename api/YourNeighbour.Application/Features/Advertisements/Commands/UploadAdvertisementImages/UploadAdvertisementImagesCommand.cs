using Microsoft.AspNetCore.Http;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UploadAdvertisementImages
{
    public sealed record UploadAdvertisementImagesCommand(int AdvertisementId, IFormFileCollection FormFileCollection) : ICommand<int>;
}
