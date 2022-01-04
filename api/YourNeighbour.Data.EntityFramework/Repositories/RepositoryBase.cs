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
        private readonly IApplicationDbContext applicationDbContext;
        private readonly DbSet<TEntity> entities;

        public RepositoryBase(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext; 
            entities = applicationDbContext.Set<TEntity>();
        }

        public IUnitOfWork UnitOfWork => applicationDbContext;

        public virtual async Task<TEntity> Create(TEntity entity)
        {
            var result = await entities.AddAsync(entity);
            await UnitOfWork.Commit();
            return result.Entity;
        }

        public virtual async Task<TEntity> GetById(int id)
        {
            return await entities.FindAsync(id);
        }

        public virtual async Task<TEntity> GetByGuid(Guid guid)
        {
            return await entities.FirstAsync(e => e.Guid == guid);
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return entities;
        }

        public virtual async Task<TEntity> Update(int id, TEntity entity)
        {
            entity.Id = id;
            var result = entities.Update(entity);
            await UnitOfWork.Commit();
            return result.Entity;
        }

        public virtual async Task<bool> Delete(int id)
        {
            TEntity entity = await entities.FindAsync(id);
            entities.Remove(entity);
            var result = await UnitOfWork.Commit();
            return result;
        }

    }
}
