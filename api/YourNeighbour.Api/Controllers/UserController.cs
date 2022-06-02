using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Authentication.Dtos;
using YourNeighbour.Application.Features.Users.Commands;
using YourNeighbour.Application.Features.Users.Dtos;
using YourNeighbour.Application.Features.Users.Queries.GetUser;

namespace YourNeighbour.Api.Controllers
{
    public class UserController : BaseController
    {
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            UserDto result = await Mediator.Send(new GetUserQuery(id));
            return Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateUserDto userDto)
        {
            int result = await Mediator.Send(new UpdateUserCommand(id, userDto));
            return Ok(result);
        }
    }
}
