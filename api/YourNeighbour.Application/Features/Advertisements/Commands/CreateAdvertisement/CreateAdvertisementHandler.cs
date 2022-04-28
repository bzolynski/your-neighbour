using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Commands.CreateAdvertisement
{
    public sealed class CreateAdvertisementHandler : ICommandHandler<CreateAdvertisementCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateAdvertisementHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(CreateAdvertisementCommand request, CancellationToken cancellationToken)
        {
            Advertisement advertisement = mapper.Map<Advertisement>(request.CreateDto);
            EntityEntry<Advertisement> response = await applicationDbContext.Set<Advertisement>().AddAsync(advertisement, cancellationToken);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return response.Entity.Id;
        }
    }
}
