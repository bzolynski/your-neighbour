using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Data.Interfaces.Repositories;

namespace YourNeighbour.Application.Features.Categories.Commands.DeleteCategory
{
    public sealed class DeleteCategoryHandler : ICommandHandler<DeleteCategoryCommand, bool>
    {
        private readonly ICategoryRepository categoryRepository;

        public DeleteCategoryHandler(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            bool result = await categoryRepository.Delete(request.Id);
            return result;
        }
    }
}
