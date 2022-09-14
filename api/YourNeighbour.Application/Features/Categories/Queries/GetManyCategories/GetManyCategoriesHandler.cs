using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetManyCategories
{
    public sealed class GetManyCategoriesHandler : IQueryHandler<GetManyCategoriesQuery, IEnumerable<CategoryDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyCategoriesHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDto>> Handle(GetManyCategoriesQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Category> categories = await applicationDbContext.Set<Category>()
                .ApplyQueryParams(request.QueryParams)
                .ToListAsync();

            return mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}
