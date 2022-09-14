using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetManyByParent
{
    public sealed class GetManyByParentHandler : IQueryHandler<GetManyByParentQuery, IEnumerable<CategoryDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyByParentHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDto>> Handle(GetManyByParentQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Category> categories = await applicationDbContext.Set<Category>()
                .ApplyQueryParams(request.QueryParams)
                .Where(c => c.ParentId == request.Id)
                .ToListAsync(cancellationToken);

            return mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}
