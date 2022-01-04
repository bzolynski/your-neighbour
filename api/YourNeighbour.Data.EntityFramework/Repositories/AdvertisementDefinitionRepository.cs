using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces;
using YourNeighbour.Data.Interfaces.Repositories;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public sealed class AdvertisementDefinitionRepository : RepositoryBase<AdvertisementDefinition>, IAdvertisementDefinitionRepository
    {
        public AdvertisementDefinitionRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
