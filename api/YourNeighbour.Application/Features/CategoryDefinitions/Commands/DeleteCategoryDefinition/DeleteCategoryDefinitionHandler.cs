using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.DeleteCategoryDefinition
{
    public sealed class DeleteCategoryDefinitionHandler : ICommandHandler<DeleteCategoryDefinitionCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteCategoryDefinitionHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteCategoryDefinitionCommand request, CancellationToken cancellationToken)
        {
            CategoryDefinition categoryDefinition = await applicationDbContext.Set<CategoryDefinition>()
                .Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (categoryDefinition.Basic)
                throw new ValidationException("Nie można usunąć podstawowej definicji.");
            if (categoryDefinition.Categories.Any())
                throw new ValidationException("Definicja ma przypisane kategorie.");
            applicationDbContext.Set<CategoryDefinition>().Remove(categoryDefinition);
            int changes = await applicationDbContext.SaveChangesAsync(cancellationToken);
            return changes > 0;
        }
    }
}
