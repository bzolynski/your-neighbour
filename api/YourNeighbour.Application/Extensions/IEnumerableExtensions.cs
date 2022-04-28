using System.Collections.Generic;
using System.Linq;

namespace YourNeighbour.Application.Extensions
{
    public static class IEnumerableExtensions
    {
        public static IEnumerable<T> TakeNullable<T>(this IEnumerable<T> source, int? quantity)
        {
            if (quantity.HasValue)
                return source.Take(quantity.Value);
            return source;
        }
    }
}
