namespace YourNeighbour.Domain.Entities.Common
{
    public class FileBase : EntityBase
    {
        public byte[] Bytes { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public decimal Size { get; set; }
    }
}
