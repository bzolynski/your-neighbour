using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Data.Interfaces
{
    public interface IRepository<TEntity> where TEntity : EntityBase
    {
        IUnitOfWork UnitOfWork { get; }
        Task<TEntity> GetById(int id);
        Task<TEntity> GetByGuid(Guid guid);
        IQueryable<TEntity> GetAll();
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Update(int id, TEntity entity);
        Task<bool> Delete(int id);

    }
}
