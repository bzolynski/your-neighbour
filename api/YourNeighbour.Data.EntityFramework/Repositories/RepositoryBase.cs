using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Data.Interfaces;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Data.EntityFramework.Repositories
{
    public class RepositoryBase<TEntity> : IRepository<TEntity>
        where TEntity : EntityBase
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly DbSet<TEntity> _entities;

        public RepositoryBase(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext; 
            _entities = applicationDbContext.Set<TEntity>();
        }

        public IUnitOfWork UnitOfWork => _applicationDbContext;

        public virtual async Task<TEntity> Create(TEntity entity)
        {
            var result = await _entities.AddAsync(entity);
            await UnitOfWork.Commit();
            return result.Entity;
        }

        public virtual async Task<TEntity> Get(int id)
        {
            return await _entities.FindAsync(id);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _entities;
        }

        public virtual async Task<TEntity> Update(int id, TEntity entity)
        {
            entity.Id = id;
            var result = _entities.Update(entity);
            await UnitOfWork.Commit();
            return result.Entity;
        }

        public virtual async Task<bool> Delete(int id)
        {
            TEntity entity = await _entities.FindAsync(id);
            _entities.Remove(entity);
            var result = await UnitOfWork.Commit();
            return result;
        }
    }
}
