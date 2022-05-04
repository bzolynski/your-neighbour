using System.Collections.Generic;

namespace YourNeighbour.Domain.Types
{
    public interface INode<T> where T : INode<T>
    {
        public T Parent { get; }
        public ICollection<T> Children { get; }
    }
}
