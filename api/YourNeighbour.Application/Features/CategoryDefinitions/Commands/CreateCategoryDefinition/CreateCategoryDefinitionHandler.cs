using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class CreateCategoryDefinitionHandler : ICommandHandler<CreateCategoryDefinitionCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateCategoryDefinitionHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(CreateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = mapper.Map<CategoryDefinition>(request.CategoryDefinition);
            EntityEntry<CategoryDefinition> result = await applicationDbContext.Set<CategoryDefinition>().AddAsync(categoryDefinition);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return result.Entity.Id;
        }
    }
}
