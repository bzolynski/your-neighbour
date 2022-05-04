using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategoryByGuid
{
    public sealed class GetCategoryByGuidHandler : IQueryHandler<GetCategoryByGuidQuery, CategoryDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetCategoryByGuidHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(GetCategoryByGuidQuery request, CancellationToken cancellationToken)
        {
            Category category = await applicationDbContext.Set<Category>()
                .IncludeIf(c => c.Definition, request.QueryParams.IncludeDefinition)
                .IncludeIf(c => c.Parent, request.QueryParams.IncludeParent)
                .IncludeIf(c => c.Children, request.QueryParams.IncludeChildren)
                .FirstOrDefaultAsync(c => c.Guid == request.Guid, cancellationToken);
            return mapper.Map<CategoryDto>(category);
        }
    }
}
