using System.Threading;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Extensions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategoryById
{
    public sealed class GetCategoryByIdHandler : IQueryHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IObjectMapper mapper;

        public GetCategoryByIdHandler(IApplicationDbContext applicationDbContext, IObjectMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            return await applicationDbContext.Set<Category>()
                .Include(c => c.Definition)
                .ProjectTo<CategoryDto>(mapper)
                .FirstOrDefaultAsync(c => c.Id == request.Id);
        }
    }
}
