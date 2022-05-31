using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition
{
    public sealed class UpdateCategoryDefinitionHandler : ICommandHandler<UpdateCategoryDefinitionCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public UpdateCategoryDefinitionHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(UpdateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = mapper.Map<CategoryDefinition>(request.CategoryDefinition);
            categoryDefinition.Id = request.Id;

            EntityEntry<CategoryDefinition> result = applicationDbContext.Set<CategoryDefinition>().Update(categoryDefinition);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return result.Entity.Id;
        }
    }
}
