using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Localizations.Commands.CreateLocalization;
using YourNeighbour.Application.Features.Localizations.Commands.DeleteLocalization;
using YourNeighbour.Application.Features.Localizations.Commands.SetPrimaryLocalization;
using YourNeighbour.Application.Features.Localizations.Commands.UpdateLocalization;
using YourNeighbour.Application.Features.Localizations.Dtos;
using YourNeighbour.Application.Features.Localizations.Queries.GetLocalization;
using YourNeighbour.Application.Features.Localizations.Queries.GetLocalizationsByUser;

namespace YourNeighbour.Api.Controllers
{
    public class LocalizationController : BaseController
    {
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            LocalizationDto result = await Mediator.Send(new GetLocalizationQuery(id));
            return Ok(result);
        }
        [HttpGet("get-many-by-user/{id}")]
        public async Task<IActionResult> GetManyByUser(int id)
        {
            IEnumerable<LocalizationDto> result = await Mediator.Send(new GetLocalizationsByUserQuery(id));
            return Ok(result);
        }
        [HttpPost("create-for-user/{id}")]
        public async Task<IActionResult> CreateForUser(LocalizationCreateDto localizationCreate, int id)
        {
            int result = await Mediator.Send(new CreateLocalizationCommand(localizationCreate, id));
            return CreatedAtAction(nameof(CreateForUser), result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateLocalizationDto localizationDto)
        {
            int result = await Mediator.Send(new UpdateLocalizationCommand(id, localizationDto));
            return Ok(result);
        }

        [HttpPatch("set-primary/{id}")]
        public async Task<IActionResult> SetPrimary(int id)
        {
            await Mediator.Send(new SetPrimaryLocalizationCommand(id));
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteLocalizationCommand(id));
            return NoContent();
        }
    }
}
