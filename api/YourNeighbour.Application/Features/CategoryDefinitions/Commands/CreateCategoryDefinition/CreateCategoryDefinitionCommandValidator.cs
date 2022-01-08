using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using YourNeighbour.Data.Interfaces.Repositories;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class CreateCategoryDefinitionCommandValidator : AbstractValidator<CreateCategoryDefinitionCommand>
    {
        private readonly ICategoryDefinitionRepository categoryDefinitionRepository;

        public CreateCategoryDefinitionCommandValidator(ICategoryDefinitionRepository categoryDefinitionRepository)
        {
            this.categoryDefinitionRepository = categoryDefinitionRepository;

            RuleFor(x => x.CategoryDefinition.Name)
                .NotNull().WithMessage("Nazwa nie może być puste.")
                .NotEmpty().WithMessage("Nazwa nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3")
                .MustAsync(BeUniqueName).WithMessage("Nazwa wyświetlana musi być unikalna");


            RuleFor(x => x.CategoryDefinition.DisplayName)
                .NotNull().WithMessage("Nie podano definicji.")
                .NotEmpty().WithMessage("Nie podano definicji.")
                .MustAsync(BeUniqueDisplayName).WithMessage("Nazwa wyświetlana musi być unikalna");
        }

        private async Task<bool> BeUniqueDisplayName(string displayName, CancellationToken cancellationToken)
        {
            return await categoryDefinitionRepository.GetByDisplayName(displayName) is null;
        }

        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await categoryDefinitionRepository.GetByName(name) is null;
        }
    }
}
