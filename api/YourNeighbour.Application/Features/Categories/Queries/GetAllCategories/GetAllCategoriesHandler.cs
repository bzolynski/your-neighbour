using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.Categories.Queries.GetAllCategories
{
    public sealed class GetAllCategoriesHandler : IQueryHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public GetAllCategoriesHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }
        public Task<IEnumerable<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Category> categories = categoryRepository.GetAll();
            return Task.FromResult(mapper.Map<IEnumerable<CategoryDto>>(categories));
        }
    }
}
