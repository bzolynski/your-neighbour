using System.Linq;

namespace YourNeighbour.Application.Abstractions
{
    public interface IMapper
    {
        T Map<T>(object source) where T : class;
        IQueryable<T> ProjectTo<T>(IQueryable source) where T : class;
    }
}
