using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.CreateFavoriteAdvertisement;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Commands.DeleteFavoriteAdvertisement;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Dtos;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.GetFavoriteAdvertisementsByUser;
using YourNeighbour.Application.Features.FavoriteAdvertisements.Queries.IsFavoriteAdvertisement;

namespace YourNeighbour.Api.Controllers
{
    public class FavoriteAdvertisementController : BaseController
    {
        [HttpGet("get-by-user/{id}")]
        public async Task<IActionResult> GetByUser(int id)
        {
            IEnumerable<FavoriteAdvertisementDto> result = await Mediator.Send(new GetFavoriteAdvertisementsByUserQuery(id));
            return Ok(result);
        }

        [HttpGet("is-favorite")]
        public async Task<IActionResult> IsFavorite([FromQuery] int userId, [FromQuery] int advertisementId)
        {
            bool result = await Mediator.Send(new IsFavoriteAdvertisementQuery(userId, advertisementId));
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFavorite([FromQuery] int userId, [FromQuery] int advertisementId)
        {
            await Mediator.Send(new CreateFavoriteAdvertisementCommand(userId, advertisementId));
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteFavorite([FromQuery] int userId, [FromQuery] int advertisementId)
        {
            await Mediator.Send(new DeleteFavoriteAdvertisementCommand(userId, advertisementId));
            return Ok();
        }
    }
}
