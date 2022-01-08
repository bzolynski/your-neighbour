using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public sealed class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly DbSet<Category> categoryContext;

        public CategoryRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
            categoryContext = applicationDbContext.Set<Category>();
        }

        public override async Task<Category> GetById(int id)
        {
            Category category = await categoryContext
                .Include(c => c.Definition)
                .FirstOrDefaultAsync(c => c.Id == id);
            return category;
        }

        public async Task<Category> GetByName(string name)
        {
            return await categoryContext.FirstOrDefaultAsync(c => c.Name == name);
        }
    }
}
