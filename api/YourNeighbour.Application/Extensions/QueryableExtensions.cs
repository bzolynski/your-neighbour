using System.Linq;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> ProjectTo<T>(this IQueryable source, IObjectMapper mapper) where T : class
        {
            return mapper.ProjectTo<T>(source);
        }
    }
}
