using System;

namespace YourNeighbour.Domain.Entities.Common
{
    public class EntityBase
    {
        public int Id { get; set; }
        public Guid Guid { get; set; } = Guid.NewGuid();
    }
}
