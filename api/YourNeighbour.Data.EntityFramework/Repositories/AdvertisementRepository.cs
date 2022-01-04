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
    public sealed class AdvertisementRepository : RepositoryBase<Advertisement>, IAdvertisementRepository
    {
        public AdvertisementRepository(IApplicationDbContext applicationDbContext) : base(applicationDbContext)
        {
        }
    }
}
