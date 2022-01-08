using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetCategoryDefinitionById
{
    public sealed class GetCategoryDefinitionByIdHandler : IQueryHandler<GetCategoryDefinitionByIdQuery, CategoryDefinitionDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetCategoryDefinitionByIdHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDefinitionDto> Handle(GetCategoryDefinitionByIdQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<CategoryDefinition>()
                .ProjectTo<CategoryDefinitionDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
        }
    }
}
