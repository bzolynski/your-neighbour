using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition
{
    public sealed class UpdateCategoryDefinitionHandler : ICommandHandler<UpdateCategoryDefinitionCommand, CategoryDefinitionDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public UpdateCategoryDefinitionHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(UpdateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = mapper.Map<CategoryDefinition>(request.CategoryDefinition);
            categoryDefinition.Id = request.Id;

            var result = applicationDbContext.Set<CategoryDefinition>().Update(categoryDefinition);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return mapper.Map<CategoryDefinitionDto>(result.Entity);
        }
    }
}
