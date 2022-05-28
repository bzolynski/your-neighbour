using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Categories.Commands.UpdateCategory
{
    public sealed class UpdateCategoryHandler : ICommandHandler<UpdateCategoryCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public UpdateCategoryHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            Category category = await applicationDbContext.Set<Category>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (category is null)
                throw new StatusCodeException("Obiekt nie znajduje się w bazie danych", System.Net.HttpStatusCode.BadRequest);
            category.DefinitionId = request.CategoryDto.DefinitionId;
            category.Name = request.CategoryDto.Name;
            category.IsActive = request.CategoryDto.IsActive;

            applicationDbContext.Update(category);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return category.Id;
        }
    }
}
