using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class CreateCategoryDefinitionHandler : ICommandHandler<CreateCategoryDefinitionCommand, CategoryDefinitionDto>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;
        private readonly IMapper mapper;

        public CreateCategoryDefinitionHandler(ICategoryDefinitionRepository categoryDefinitionRepository, IMapper mapper)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(CreateCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = mapper.Map<CategoryDefinition>(request.CategoryDefinition);
            CategoryDefinition result = await categoryDefinitionRepository.Create(categoryDefinition);
            return mapper.Map<CategoryDefinitionDto>(result);
        }
    }
}
