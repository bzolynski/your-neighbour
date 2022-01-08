using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

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
            if (await categoryDefinitionRepository.IsBasicById(request.Id))
                throw new ValidationException("Nie można usunąć podstawowej definicji.");
            if (await categoryDefinitionRepository.HasAnyCategoryById(request.Id))
                throw new ValidationException("Definicja ma przypisane kategorie.");
            return await categoryDefinitionRepository.Delete(request.Id);
        }
    }
}
