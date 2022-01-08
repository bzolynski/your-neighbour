using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class CreateCategoryDefinitionCommandValidator : AbstractValidator<CreateCategoryDefinitionCommand>
    {
        private readonly DbSet<CategoryDefinition> categoryDefinitionContext;

        public CreateCategoryDefinitionCommandValidator(IApplicationDbContext applicationDbContext)
        {
            categoryDefinitionContext = applicationDbContext.Set<CategoryDefinition>();

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
            return await categoryDefinitionContext.FirstOrDefaultAsync(x => x.DisplayName == displayName) is null;
        }

        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await categoryDefinitionContext.FirstOrDefaultAsync(x => x.DisplayName == name) is null;
        }
    }
}
