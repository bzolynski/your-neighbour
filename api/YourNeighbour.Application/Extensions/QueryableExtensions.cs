using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> ProjectTo<T>(this IQueryable source, IMapper mapper) where T : class
        {
            return mapper.ProjectTo<T>(source);
        }
        public static IQueryable<TEntity> IncludeIf<TEntity, TProperty>(this IQueryable<TEntity> source, Expression<Func<TEntity, TProperty>> navigationPropertyPath, bool condition) where TEntity : class
        {
            if (condition)
                return source.Include(navigationPropertyPath);
            return source;
        }
    }
}
