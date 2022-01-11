using System.Linq;

namespace YourNeighbour.Application.Abstractions
{
    public interface IObjectMapper
    {
        T Map<T>(object source) where T : class;
        IQueryable<T> ProjectTo<T>(IQueryable source) where T : class;
    }
}
