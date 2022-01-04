using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Commands.CreateAdvertisementDefinition;
using YourNeighbour.Application.Features.AdvertisementDefinitions.Dtos;

namespace YourNeighbour.Api.Controllers
{
    public sealed class AdvertisementDefinitionController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Response>> Create(AdvertisementDefinitionCreateDto createAdvertisement)
        {
            AdvertisementDefinitionDto advertisementDefinition = await Mediator.Send(new CreateAdvertisementDefinitionCommand(createAdvertisement));
            return Models.Response.Success(advertisementDefinition);
        }
    }
}
