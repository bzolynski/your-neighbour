using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategory
{
    public sealed class GetCategoryHandler : IQueryHandler<GetCategoryQuery, CategoryDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetCategoryHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
        {
            Category category = await applicationDbContext.Set<Category>()
                .ApplyQueryParams(request.QueryParams)
                .FirstOrDefaultAsync(c => c.Id == request.Id);
            return mapper.Map<CategoryDto>(category);
        }
    }
}
