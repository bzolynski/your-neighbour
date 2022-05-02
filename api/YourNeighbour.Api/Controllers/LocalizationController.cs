using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Application.Features.Localizations.Queries.GetLocalization;
using YourNeighbour.Application.Features.Localizations.Queries.GetLocalizationsByUser;

namespace YourNeighbour.Api.Controllers
{
    public class LocalizationController : BaseController
    {
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> Get(int id)
        {
            LocalizationDto result = await Mediator.Send(new GetLocalizationQuery(id));
            return Models.Response.Success(result);
        }
        [HttpGet("get-many-by-user/{id}")]
        public async Task<ActionResult<Response>> GetManyByUser(int id)
        {
            IEnumerable<LocalizationDto> result = await Mediator.Send(new GetLocalizationsByUserQuery(id));
            return Models.Response.Success(result);
        }
        [HttpPut("create-for-user/{id}")]
        public async Task<ActionResult<Response>> CreateForUser(LocalizationCreateDto localizationCreate, int id)
        {
            int result = await Mediator.Send(new CreateLocalizationCommand(localizationCreate, id));
            return Models.Response.Success(result);
        }
    }
}
