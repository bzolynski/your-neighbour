namespace YourNeighbour.Application.Features.Authentication.Dtos
{
    public sealed class AuthenticationDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UserInfo { get; set; }
    }
}
