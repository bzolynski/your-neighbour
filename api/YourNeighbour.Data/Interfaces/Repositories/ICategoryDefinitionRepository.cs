 using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Data.Interfaces.Repositories
{
    public interface ICategoryDefinitionRepository : IRepository<CategoryDefinition>
    {
        Task<bool> ExistsByDisplayName(string displayName);
        Task<bool> ExistsByName(string name);
        Task<CategoryDefinition> GetByDisplayName(string displayName);
        Task<CategoryDefinition> GetByName(string name);
        Task<bool> HasAnyCategoryById(int id);
        Task<bool> IsBasicById(int id);
    }
}
