using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace YourNeighbour.Application.Features.Categories.Commands.CreateCategory
{
    public sealed class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidator()
        {
            RuleFor(x => x.Category.Name)
                .NotNull().WithMessage("Nazwa nie może być puste.")
                .NotEmpty().WithMessage("Nazwa nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3");

            RuleFor(x => x.Category.DefinitionId)
                .NotNull().WithMessage("Nie podano definicji.")
                .NotEmpty().WithMessage("Nie podano definicji.");
        }
    }
}
