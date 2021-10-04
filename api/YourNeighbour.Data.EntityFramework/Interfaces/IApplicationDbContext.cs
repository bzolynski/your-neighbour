using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Data.Interfaces;

namespace YourNeighbour.Data.EntityFramework.Interfaces
{
    public interface IApplicationDbContext : IUnitOfWork
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
