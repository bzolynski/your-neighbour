using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategoryById
{
    public sealed class GetCategoryByIdHandler : IQueryHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public GetCategoryByIdHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            Category category = await categoryRepository.GetById(request.Id);
            return mapper.Map<CategoryDto>(category);
        }
    }
}
