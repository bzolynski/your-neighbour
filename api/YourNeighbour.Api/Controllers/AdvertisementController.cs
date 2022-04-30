using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Advertisements.Commands.CreateAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Dtos;

namespace YourNeighbour.Api.Controllers
{
    public class AdvertisementController : BaseController
    {
        [HttpPost("create/{userId}")]
        public async Task<ActionResult<Response>> Create(CreateAdvertisementDto createDto, int userId)
        {
            int result = await Mediator.Send(new CreateAdvertisementCommand(createDto, userId));
            return Models.Response.Success(result);
        }
    }
}
