using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public sealed class CategoryDefinitionRepository : RepositoryBase<CategoryDefinition>, ICategoryDefinitionRepository
    {
        public CategoryDefinitionRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
