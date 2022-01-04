using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Data.Interfaces.Repositories;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.DeleteCategoryDefinition
{
    public sealed class DeleteCategoryDefinitionHandler : ICommandHandler<DeleteCategoryDefinitionCommand, bool>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;

        public DeleteCategoryDefinitionHandler(ICategoryDefinitionRepository categoryDefinitionRepository)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;
        }
        public async Task<bool> Handle(DeleteCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            return await categoryDefinitionRepository.Delete(request.Id);
        }
    }
}
