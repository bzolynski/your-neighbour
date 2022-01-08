using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition
{
    public sealed class CreateAdvertisementDefinitionCommandValidator : AbstractValidator<CreateAdvertisementDefinitionCommand>
    {
        public CreateAdvertisementDefinitionCommandValidator()
        {
            RuleFor(x => x.AdvertisementDefinition.DisplayName)
                .NotEmpty().WithMessage("Nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3");
            RuleFor(x => x.AdvertisementDefinition.Name)
                .NotEmpty().WithMessage("Nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3");
        }
    }
}
