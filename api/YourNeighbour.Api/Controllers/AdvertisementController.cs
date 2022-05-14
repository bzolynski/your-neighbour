using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Advertisements.Commands.CreateAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Commands.DeleteAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Commands.UpdateAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Application.Features.Advertisements.Queries;
using YourNeighbour.Application.Features.Advertisements.Queries.GetAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisements;
using YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByCategory;
using YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByUser;

namespace YourNeighbour.Api.Controllers
{
    public class AdvertisementController : BaseController
    {
        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] AdvertisementSearchableQueryParams queryParams)
        {
            IEnumerable<AdvertisementDto> result = await Mediator.Send(new GetManyAdvertisementsQuery(queryParams));
            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] AdvertisementQueryParams queryParams)
        {
            AdvertisementDto result = await Mediator.Send(new GetAdvertisementQuery(id, queryParams));
            return Ok(result);

        }

        [HttpGet("get-by-category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId, [FromQuery] AdvertisementSearchableQueryParams queryParams)
        {
            IEnumerable<AdvertisementDto> result = await Mediator.Send(new GetManyAdvertisementsByCategoryQuery(categoryId, queryParams));
            return Ok(result);
        }


        [HttpGet("get-by-user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId, [FromQuery] AdvertisementSearchableQueryParams queryParams)
        {
            IEnumerable<AdvertisementDto> result = await Mediator.Send(new GetManyAdvertisementsByUserQuery(userId, queryParams));
            return Ok(result);
        }

        [HttpPost("create/{userId}")]
        public async Task<IActionResult> Create(CreateAdvertisementDto createDto, int userId)
        {
            int result = await Mediator.Send(new CreateAdvertisementCommand(createDto, userId));
            return CreatedAtAction(nameof(Create), result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateAdvertisementDto advertisementDto)
        {
            int result = await Mediator.Send(new UpdateAdvertisementCommand(id, advertisementDto));
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteAdvertisementCommand(id));
            return NoContent();
        }
    }
}
