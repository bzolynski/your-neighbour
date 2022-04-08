using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities
{
    public class FileBase : EntityBase
    {
        public byte[] Content { get; set; }
    }
}
