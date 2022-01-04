using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public sealed class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
