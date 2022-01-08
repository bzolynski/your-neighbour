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

namespace YourNeighbour.Application.Features.Categories.Commands
{
    public sealed class CreateCategoryHandler : ICommandHandler<CreateCategoryCommand, CategoryDto>
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public CreateCategoryHandler(ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            Category category = mapper.Map<Category>(request.Category);
            Category result = await categoryRepository.Create(category);
            return mapper.Map<CategoryDto>(result);
        }
    }
}
