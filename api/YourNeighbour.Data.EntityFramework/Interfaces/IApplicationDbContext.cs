using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using YourNeighbour.Data.Interfaces;

namespace YourNeighbour.Data.EntityFramework.Interfaces
{
    public interface IApplicationDbContext : IUnitOfWork
    {
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        public DatabaseFacade Database { get; }
    }
}
