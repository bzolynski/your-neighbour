using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed class UpdateCategoryDefinitionCommandValidator : AbstractValidator<UpdateCategoryDefinitionCommand>
    {
        private readonly DbSet<CategoryDefinition> categoryDefinitionContext;

        public UpdateCategoryDefinitionCommandValidator(IApplicationDbContext applicationDbContext)
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

        private async Task<bool> BeUniqueDisplayName(UpdateCategoryDefinitionCommand command, string displayName, CancellationToken cancellationToken)
        {
            return await categoryDefinitionContext.FirstOrDefaultAsync(x => x.DisplayName == displayName && command.Id != x.Id) is null;
        }

        private async Task<bool> BeUniqueName(UpdateCategoryDefinitionCommand command, string name, CancellationToken cancellationToken)
        {
            return await categoryDefinitionContext.FirstOrDefaultAsync(x => x.DisplayName == name && command.Id != x.Id) is null;
        }
    }
}
