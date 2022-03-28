using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetUnassigned
{
    public sealed class GetUnassignedCategoriesHandler : IQueryHandler<GetUnassignedCategoriesCommand, IEnumerable<CategoryDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetUnassignedCategoriesHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDto>> Handle(GetUnassignedCategoriesCommand request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<Category>()
                .Where(x => x.ParentId == null && x.Guid != Category.RootCategoryGuid)
                .Include(x => x.Definition)
                .ProjectTo<CategoryDto>(mapper)
                .ToListAsync();
        }
    }
}
