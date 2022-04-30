using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Queries.GetManyAdvertisementDefinitions;

namespace YourNeighbour.Api.Controllers
{
    public sealed class AdvertisementDefinitionController : BaseController
    {
        [HttpPost("create")]
        public async Task<ActionResult<Response>> Create(AdvertisementDefinitionCreateDto createAdvertisement)
        {
            AdvertisementDefinitionDto advertisementDefinition = await Mediator.Send(new CreateAdvertisementDefinitionCommand(createAdvertisement));
            return Models.Response.Success(advertisementDefinition);
        }
        [HttpGet("get")]
        public async Task<ActionResult<Response>> Get()
        {
            IEnumerable<AdvertisementDefinitionDto> advertisementDefinitions = await Mediator.Send(new GetManyAdvertisementDefinitionsQuery());
            return Models.Response.Success(advertisementDefinitions);
        }
    }
}
