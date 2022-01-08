using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Commands
{
    public sealed class CreateCategoryHandler : ICommandHandler<CreateCategoryCommand, CategoryDto>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateCategoryHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            Category category = mapper.Map<Category>(request.Category);
            var result = await applicationDbContext.Set<Category>().AddAsync(category);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return mapper.Map<CategoryDto>(result.Entity);
        }
    }
}
