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

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetCategoryDefinitionById
{
    public sealed class GetCategoryDefinitionByIdHandler : IQueryHandler<GetCategoryDefinitionByIdQuery, CategoryDefinitionDto>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;
        private readonly IMapper mapper;

        public GetCategoryDefinitionByIdHandler(ICategoryDefinitionRepository categoryDefinitionRepository, IMapper mapper)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(GetCategoryDefinitionByIdQuery request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = await categoryDefinitionRepository.GetById(request.Id);
            return mapper.Map<CategoryDefinitionDto>(categoryDefinition);
        }
    }
}
