using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Commands.CreateCategory
{
    public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
    {
        private readonly DbSet<Category> categoryContext;

        public CreateCategoryCommandValidator(IApplicationDbContext applicationDbContext)
        {
            categoryContext = applicationDbContext.Set<Category>();
            RuleFor(x => x.Category.Name)
                .NotNull().WithMessage("Nazwa nie może być puste.")
                .NotEmpty().WithMessage("Nazwa nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3")
                .MustAsync(BeUniqueName).WithMessage("Nazwa wyświetlana musi być unikalna");

            RuleFor(x => x.Category.DefinitionId)
                .NotNull().WithMessage("Nie podano definicji.")
                .NotEmpty().WithMessage("Nie podano definicji.");
        }

        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await categoryContext.FirstOrDefaultAsync(x => x.Name == name) is null;
        }
    }
}
