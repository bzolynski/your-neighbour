using System;

namespace YourNeighbour.Application.Features.Common.Dtos
{
    public sealed class ImageDto
    {
        public Guid Guid { get; set; }
        public byte[] Bytes { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public decimal Size { get; set; }
    }
}
