using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition
{
    public sealed class UpdateCategoryDefinitionHandler : ICommandHandler<UpdateCategoryDefinitionCommand, CategoryDefinitionDto>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;
        private readonly IMapper mapper;

        public UpdateCategoryDefinitionHandler(ICategoryDefinitionRepository categoryDefinitionRepository, IMapper mapper)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(UpdateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = await categoryDefinitionRepository.Update(request.Id, mapper.Map<CategoryDefinition>(request.CategoryDefinition));

            return mapper.Map<CategoryDefinitionDto>(categoryDefinition);
        }
    }
}
