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

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetAllCategoryDefinitions
{
    public sealed class GetAllCategoryDefinitionsHandler : IQueryHandler<GetAllCategoryDefinitionsQuery, IEnumerable<CategoryDefinitionDto>>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;
        private readonly IMapper mapper;

        public GetAllCategoryDefinitionsHandler(ICategoryDefinitionRepository categoryDefinitionRepository, IMapper mapper)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;
            this.mapper = mapper;
        }
        public Task<IEnumerable<CategoryDefinitionDto>> Handle(GetAllCategoryDefinitionsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<CategoryDefinition> categoryDefinitions = categoryDefinitionRepository.GetAll();
            return Task.FromResult(mapper.Map<IEnumerable<CategoryDefinitionDto>>(categoryDefinitions));
        }
    }
}
