using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Advertisements.Commands.CreateAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Dtos;
using YourNeighbour.Application.Features.Advertisements.Queries;
using YourNeighbour.Application.Features.Advertisements.Queries.GetAdvertisement;
using YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisements;
using YourNeighbour.Application.Features.Advertisements.Queries.GetManyAdvertisementsByCategory;

namespace YourNeighbour.Api.Controllers
{
    public class AdvertisementController : BaseController
    {
        [HttpGet("get")]
        public async Task<ActionResult<Response>> Get([FromQuery] AdvertisementSearchableQueryParams queryParams)
        {
            IEnumerable<AdvertisementDto> result = await Mediator.Send(new GetManyAdvertisementsQuery(queryParams));
            return Models.Response.Success(result);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> Get(int id, [FromQuery] AdvertisementQueryParams queryParams)
        {
            AdvertisementDto result = await Mediator.Send(new GetAdvertisementQuery(id, queryParams));
            return Models.Response.Success(result);
        }

        [HttpGet("get-by-category/{categoryId}")]
        public async Task<ActionResult<Response>> GetByCategory(int categoryId, [FromQuery] AdvertisementSearchableQueryParams queryParams)
        {
            IEnumerable<AdvertisementDto> result = await Mediator.Send(new GetManyAdvertisementsByCategoryQuery(categoryId, queryParams));
            return Models.Response.Success(result);
        }

        [HttpPost("create/{userId}")]
        public async Task<ActionResult<Response>> Create(CreateAdvertisementDto createDto, int userId)
        {
            int result = await Mediator.Send(new CreateAdvertisementCommand(createDto, userId));
            return Models.Response.Success(result);
        }
    }
}
