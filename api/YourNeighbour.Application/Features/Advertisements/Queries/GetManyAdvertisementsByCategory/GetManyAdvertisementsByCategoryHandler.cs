using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByCategory
{
    public sealed class GetManyAdvertisementsByCategoryHandler : IQueryHandler<GetManyAdvertisementsByCategoryQuery, IEnumerable<AdvertisementDto>>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public GetManyAdvertisementsByCategoryHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<IEnumerable<AdvertisementDto>> Handle(GetManyAdvertisementsByCategoryQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Category> categoriesQuery = applicationDbContext.Set<Category>().AsQueryable();
            List<int> categoriesId = new();
            foreach (Category category in categoriesQuery.ToArray())
            {
                if (category.Id == request.CategoryId)
                {
                    categoriesId.Add(category.Id);
                    categoriesId.AddRange(category.Descendants().Select(x => x.Id));
                    break;
                }
            }

            IEnumerable<Advertisement> advertisements = await applicationDbContext.Set<Advertisement>()
                .Where(a => categoriesId.Any(c => c == a.Item.CategoryId))
                .ApplySearchableQueryParams(request.QueryParams)
                .ToListAsync(cancellationToken);

            return mapper.Map<IEnumerable<AdvertisementDto>>(advertisements);
        }

    }
}
