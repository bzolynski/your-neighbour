using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Application.Features.Localizations.Queries.GetLocalizationsByUser;

namespace YourNeighbour.Api.Controllers
{
    public class LocalizationController : BaseController
    {
        [HttpGet("get-many-by-user/{id}")]
        public async Task<ActionResult<Response>> GetManyByUser(int id)
        {
            IEnumerable<LocalizationDto> localizations = await Mediator.Send(new GetLocalizationsByUserQuery(id));
            return Models.Response.Success(localizations);
        }
        [HttpPut("create-for-user")]
        public async Task<ActionResult<Response>> CreateForUser(LocalizationCreateDto localizationCreate)
        {
            LocalizationDto localization = await Mediator.Send(new CreateLocalizationCommand(localizationCreate));
            return Models.Response.Success(localization);
        }
    }
}
