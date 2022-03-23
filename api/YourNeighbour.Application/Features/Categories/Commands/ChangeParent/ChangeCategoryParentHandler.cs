using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Commands.ChangeParent
{
    public sealed class ChangeCategoryParentHandler : ICommandHandler<ChangeCategoryParentCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public ChangeCategoryParentHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<bool> Handle(ChangeCategoryParentCommand request, CancellationToken cancellationToken)
        {
            Category category = await applicationDbContext.Set<Category>().FindAsync(request.CategoryId);
            category.ParentId = request.ParentId;
            applicationDbContext.Set<Category>().Update(category);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
