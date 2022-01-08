using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public sealed class CategoryDefinitionRepository : RepositoryBase<CategoryDefinition>, ICategoryDefinitionRepository
    {
        private readonly DbSet<CategoryDefinition> categoryDefinitionContext;

        public CategoryDefinitionRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            categoryDefinitionContext = applicationDbContext.Set<CategoryDefinition>();
        }

        public async Task<bool> ExistsByName(string name)
        {
            return await GetByName(name) is not null;
        }

        public async Task<bool> ExistsByDisplayName(string displayName)
        {
            return await GetByDisplayName(displayName) is not null;
        }

        public async Task<bool> IsBasicById(int id)
        {
            return (await base.GetById(id)).Basic;
        }

        public async Task<bool> HasAnyCategoryById(int id)
        {
            return (await categoryDefinitionContext.Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == id)).Categories.Any();
        }

        public async Task<CategoryDefinition> GetByName(string name)
        {
            return await categoryDefinitionContext.FirstOrDefaultAsync(c => c.Name == name);
        }

        public async Task<CategoryDefinition> GetByDisplayName(string displayName)
        {
            return await categoryDefinitionContext.FirstOrDefaultAsync(c => c.DisplayName == displayName);
        }


    }
}
