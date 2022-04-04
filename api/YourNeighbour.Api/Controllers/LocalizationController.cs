using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization;
using YourNeighbour.Application.Features.Localizations.Dtos;

namespace YourNeighbour.Api.Controllers
{
    public class LocalizationController : BaseController
    {
        [HttpPut("create-for-user")]
        public async Task<ActionResult<Response>> CreateForUser(LocalizationCreateDto localizationCreate)
        {
            LocalizationDto category = await Mediator.Send(new CreateLocalizationCommand(localizationCreate));
            return Models.Response.Success(category);
        }
    }
}
