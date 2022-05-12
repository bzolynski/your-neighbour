using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using YourNeighbour.Application.Features.Authentication.Commands.Login;
using YourNeighbour.Application.Features.Authentication.Commands.Logout;
using YourNeighbour.Application.Features.Authentication.Commands.Refresh;
using YourNeighbour.Application.Features.Authentication.Commands.Register;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Application.Features.Authentication.Queries.GetCurrentUser;
using YourNeighbour.Domain.Options;

namespace YourNeighbour.Api.Controllers
{
    public class AuthenticationController : BaseController
    {
        private readonly AuthorizationOptions authenticationOptions;

        public AuthenticationController(IOptions<AuthorizationOptions> authenticationOptions)
        {
            this.authenticationOptions = authenticationOptions.Value;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {
            bool succeded = await Mediator.Send(new RegisterCommand(register));
            return CreatedAtAction(nameof(Register), succeded);
        }
        [HttpGet("get-current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            UserDto user = await Mediator.Send(new GetCurrentUserQuery());
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            AuthenticationDto authenticationResult = await Mediator.Send(new LoginCommand(login));
            SetAccessTokenCookie(authenticationResult.AccessToken);
            SetRefreshTokenCookie(authenticationResult.RefreshToken);
            return Ok(authenticationResult.User);
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            if (!HttpContext.Request.Cookies.TryGetValue("refresh-token", out string refreshToken))
                return Ok(true);

            bool succeded = await Mediator.Send(new LogoutCommand(new LogoutDto { RefreshToken = refreshToken }));
            RemoveCookie("access-token");
            RemoveCookie("refresh-token");
            return Ok(succeded);
        }
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            if (!Request.Cookies.TryGetValue("refresh-token", out string refreshToken))
                throw new AuthenticationException("Invalid token");

            AuthenticationDto authenticationResult = await Mediator.Send(new RefreshCommand(new RefreshDto { RefreshToken = refreshToken }));
            SetRefreshTokenCookie(authenticationResult.RefreshToken);
            SetAccessTokenCookie(authenticationResult.AccessToken);
            return Ok(true);
        }

        private void SetRefreshTokenCookie(string value)
        {
            CookieOptions options = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(authenticationOptions.RefreshTokenExpirationMinutes)
            };
            Response.Cookies.Append("refresh-token", value, options);
        }
        private void SetAccessTokenCookie(string value)
        {
            CookieOptions options = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddMinutes(authenticationOptions.AccessTokenExpirationMinutes)
            };
            Response.Cookies.Append("access-token", value, options);
        }

        private void RemoveCookie(string key)
        {
            Response.Cookies.Delete(key);
        }

    }
}
