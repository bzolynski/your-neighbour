using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class CreateCategoryDefinitionHandler : ICommandHandler<CreateCategoryDefinitionCommand, CategoryDefinitionDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IObjectMapper mapper;

        public CreateCategoryDefinitionHandler(IApplicationDbContext applicationDbContext, IObjectMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(CreateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = mapper.Map<CategoryDefinition>(request.CategoryDefinition);
            var result = await applicationDbContext.Set<CategoryDefinition>().AddAsync(categoryDefinition);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return mapper.Map<CategoryDefinitionDto>(result.Entity);
        }
    }
}
