using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Categories.Commands.DeleteCategory
{
    public sealed class DeleteCategoryHandler : ICommandHandler<DeleteCategoryCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteCategoryHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {            
            Category category = await applicationDbContext.Set<Category>().FirstOrDefaultAsync(x => x.Id == request.Id);
            if (category is null)
                return true;
            applicationDbContext.Set<Category>().Remove(category);
            int changes = await applicationDbContext.SaveChangesAsync(cancellationToken);
            return changes > 0;
        }
    }
}
