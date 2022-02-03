using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Authentication.Commands.Login;
using YourNeighbour.Application.Features.Authentication.Commands.Logout;
using YourNeighbour.Application.Features.Authentication.Commands.Refresh;
using YourNeighbour.Application.Features.Authentication.Commands.Register;
using YourNeighbour.Application.Features.Authentication.Dtos;

namespace YourNeighbour.Api.Controllers
{
    public class AuthenticationController : BaseController
    {
        [HttpPost("register")]
        public async Task<ActionResult<Response>> Register(RegisterDto register)
        {
            bool succeded = await Mediator.Send(new RegisterCommand(register));
            return Models.Response.Success(succeded);
        }
        [HttpPost("login")]
        public async Task<ActionResult<Response>> Login(LoginDto login)
        {
            AuthenticationDto authenticationResult = await Mediator.Send(new LoginCommand(login));
            return Models.Response.Success(authenticationResult);
        }
        [HttpPost("logout")]
        public async Task<ActionResult<Response>> Logout(LogoutDto logout)
        {
            bool succeded = await Mediator.Send(new LogoutCommand(logout));
            return Models.Response.Success(succeded);
        }
        [HttpPost("refresh")]
        public async Task<ActionResult<Response>> Refresh(RefreshDto refresh)
        {
            AuthenticationDto authenticationResult = await Mediator.Send(new RefreshCommand(refresh));
            return Models.Response.Success(authenticationResult);
        }


    }
}
