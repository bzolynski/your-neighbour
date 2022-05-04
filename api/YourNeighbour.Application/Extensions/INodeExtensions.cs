using System.Collections.Generic;
using System.Linq;
using YourNeighbour.Domain.Types;

namespace YourNeighbour.Application.Extensions
{
    public static class INodeExtensions
    {
        public static IEnumerable<T> Descendants<T>(this T node) where T : INode<T>
        {
            return node.Children.Concat(node.Children.SelectMany(n => n.Descendants()));
        }
    }
}
