using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Extensions
{
    public sealed class CustomIncludableQueryable<TEntity, TProperty> : IIncludableQueryable<TEntity, TProperty>, IQueryable<TEntity>, IEnumerable<TEntity>, IEnumerable, IQueryable, IAsyncEnumerable<TEntity>
    {
        private readonly IQueryable<TEntity> _queryable;

        public Expression Expression => _queryable.Expression;

        public Type ElementType => _queryable.ElementType;

        public IQueryProvider Provider => _queryable.Provider;

        public CustomIncludableQueryable(IQueryable<TEntity> queryable)
        {
            _queryable = queryable;
        }

        public IAsyncEnumerator<TEntity> GetAsyncEnumerator(CancellationToken cancellationToken = default(CancellationToken))
        {
            return ((IAsyncEnumerable<TEntity>)_queryable).GetAsyncEnumerator(cancellationToken);
        }

        public IEnumerator<TEntity> GetEnumerator()
        {
            return _queryable.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    public static class QueryableExtensions
    {
        public static IQueryable<T> ProjectTo<T>(this IQueryable source, IMapper mapper) where T : class
        {
            return mapper.ProjectTo<T>(source);
        }

        public static IIncludableQueryable<TEntity, TProperty> IncludeIf<TEntity, TProperty>(this IQueryable<TEntity> source, Expression<Func<TEntity, TProperty>> navigationPropertyPath, bool condition) where TEntity : class
        {
            if (condition)
                return source.Include(navigationPropertyPath);
            return new CustomIncludableQueryable<TEntity, TProperty>(source);
        }

        public static IIncludableQueryable<TEntity, TProperty> ThenIncludeIf<TEntity, TPreviousProperty, TProperty>(this IIncludableQueryable<TEntity, TPreviousProperty> source, Expression<Func<TPreviousProperty, TProperty>> navigationPropertyPath, bool condition) where TEntity : class
        {
            if (condition)
                return source.ThenInclude(navigationPropertyPath);
            return new CustomIncludableQueryable<TEntity, TProperty>(source); ;
        }

        public static IQueryable<TEntity> WhereIf<TEntity>(this IQueryable<TEntity> source, Expression<Func<TEntity, bool>> predicate, bool condition) where TEntity : class
        {
            if (condition)
                return source.Where(predicate);
            return source;
        }
    }
}
