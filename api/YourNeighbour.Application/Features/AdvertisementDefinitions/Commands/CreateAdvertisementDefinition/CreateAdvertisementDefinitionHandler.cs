using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition
{
    public sealed class CreateAdvertisementDefinitionHandler : ICommandHandler<CreateAdvertisementDefinitionCommand, AdvertisementDefinitionDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateAdvertisementDefinitionHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<AdvertisementDefinitionDto> Handle(CreateAdvertisementDefinitionCommand request, CancellationToken cancellationToken)
        {
            AdvertisementDefinition advertisementDefinition = mapper.Map<AdvertisementDefinition>(request.AdvertisementDefinition);
            var result = await applicationDbContext.Set<AdvertisementDefinition>().AddAsync(advertisementDefinition);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return mapper.Map<AdvertisementDefinitionDto>(result.Entity);
        }
    }
}
