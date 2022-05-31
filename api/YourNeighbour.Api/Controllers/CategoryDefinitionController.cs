using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.DeleteCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionDisplayNameExists;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionNameExists;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetAllCategoryDefinitions;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetCategoryDefinitionById;

namespace YourNeighbour.Api.Controllers
{
    public sealed class CategoryDefinitionController : BaseController
    {
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            CategoryDefinitionDto categoryDefinitions = await Mediator.Send(new GetCategoryDefinitionByIdQuery(id));
            return Ok(categoryDefinitions);
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetMany()
        {
            IEnumerable<CategoryDefinitionDto> categoryDefinitions = await Mediator.Send(new GetAllCategoryDefinitionsQuery());
            return Ok(categoryDefinitions);
        }

        [HttpPut("create")]
        public async Task<IActionResult> Create(CategoryDefinitionCreateDto createCategoryDefinition)
        {
            int result = await Mediator.Send(new CreateCategoryDefinitionCommand(createCategoryDefinition));
            return CreatedAtAction(nameof(Create), result);
        }

        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update(int id, CategoryDefinitionUpdateDto updateCategoryDefinition)
        {
            int result = await Mediator.Send(new UpdateCategoryDefinitionCommand(id, updateCategoryDefinition));
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCategoryDefinitionCommand(id));
            return NoContent();
        }
        [HttpGet("nameExists")]
        public async Task<IActionResult> CheckNameExists([FromQuery] string name)
        {
            bool exists = await Mediator.Send(new CheckCategoryDefinitionNameExistsQuery(name));
            return Ok(exists);
        }
        [HttpGet("displayNameExists")]
        public async Task<IActionResult> CheckDisplayNameExists([FromQuery] string displayName)
        {
            bool exists = await Mediator.Send(new CheckCategoryDefinitionDisplayNameExistsQuery(displayName));
            return Ok(exists);
        }
    }
}
