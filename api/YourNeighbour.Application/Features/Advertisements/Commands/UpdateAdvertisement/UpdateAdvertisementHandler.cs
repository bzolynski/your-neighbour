using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Commands.UpdateAdvertisement
{
    public sealed class UpdateAdvertisementHandler : ICommandHandler<UpdateAdvertisementCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public UpdateAdvertisementHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(UpdateAdvertisementCommand request, CancellationToken cancellationToken)
        {
            Advertisement advertisement = await applicationDbContext.Set<Advertisement>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            advertisement.DefinitionId = request.AdvertisementDto.DefinitionId;
            advertisement.LocalizationId = request.AdvertisementDto.LocalizationId;
            advertisement.ItemId = request.AdvertisementDto.ItemId;
            advertisement.Title = request.AdvertisementDto.Title;
            advertisement.Description = request.AdvertisementDto.Description;
            applicationDbContext.Update(advertisement);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}
