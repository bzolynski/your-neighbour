using System;

namespace YourNeighbour.Domain.Entities
{
    public sealed class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public Guid UserGuid { get; set; }
        public bool Used { get; set; }
        public bool Invalidated { get; set; }
        public DateTime ExpiryDate { get; set; }

    }
}
