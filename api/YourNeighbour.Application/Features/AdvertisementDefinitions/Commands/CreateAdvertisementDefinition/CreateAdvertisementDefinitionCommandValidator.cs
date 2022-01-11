using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition
{
    public sealed class CreateAdvertisementDefinitionCommandValidator : AbstractValidator<CreateAdvertisementDefinitionCommand>
    {
        private readonly DbSet<AdvertisementDefinition> advertisementDefinitionContext;

        public CreateAdvertisementDefinitionCommandValidator(IApplicationDbContext applicationDbContext)
        {
            advertisementDefinitionContext = applicationDbContext.Set<AdvertisementDefinition>();
            RuleFor(x => x.AdvertisementDefinition.DisplayName)
                .NotEmpty().WithMessage("Nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3")
                .MustAsync(BeUniqueDisplayName).WithMessage("Nazwa wyświetlana musi być unikalna");
            RuleFor(x => x.AdvertisementDefinition.Name)
                .NotEmpty().WithMessage("Nie może być puste.")
                .MinimumLength(3).WithMessage("Minimalna długość nazwy to 3")
                .MustAsync(BeUniqueName).WithMessage("Nazwa wyświetlana musi być unikalna");
        }

        private async Task<bool> BeUniqueDisplayName(string displayName, CancellationToken cancellationToken)
        {
            return await advertisementDefinitionContext.FirstOrDefaultAsync(x => x.DisplayName == displayName) is null;
        }
        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await advertisementDefinitionContext.FirstOrDefaultAsync(x => x.Name == name) is null;
        }
    }
}
