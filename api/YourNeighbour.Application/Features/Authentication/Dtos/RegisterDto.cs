namespace YourNeighbour.Application.Features.Authentication.Dtos
{
    public sealed class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
