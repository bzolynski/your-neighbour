namespace YourNeighbour.Domain.Options
{
    public class AuthorizationOptions
    {
        public string Issuer { get; set; }
        public string AccessTokenKey { get; set; }
        public double AccessTokenExpirationMinutes { get; set; }
        public string RefreshTokenKey { get; set; }
        public double RefreshTokenExpirationMinutes { get; set; }
    }
}
