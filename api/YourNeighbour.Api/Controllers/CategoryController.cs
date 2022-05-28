using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Categories.Commands.ChangeParent;
using YourNeighbour.Application.Features.Categories.Commands.CreateCategory;
using YourNeighbour.Application.Features.Categories.Commands.DeleteCategory;
using YourNeighbour.Application.Features.Categories.Commands.UpdateCategory;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Categories.Queries;
using YourNeighbour.Application.Features.Categories.Queries.GetCategory;
using YourNeighbour.Application.Features.Categories.Queries.GetCategoryByGuid;
using YourNeighbour.Application.Features.Categories.Queries.GetManyCategories;
using YourNeighbour.Application.Features.Categories.Queries.GetUnassigned;

namespace YourNeighbour.Api.Controllers
{
    public class CategoryController : BaseController
    {
        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] CategoryQueryParams queryParams)
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetManyCategoriesQuery(queryParams));
            return Ok(categories);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] CategoryQueryParams queryParams)
        {
            CategoryDto category = await Mediator.Send(new GetCategoryQuery(id, queryParams));
            return Ok(category);
        }

        [HttpGet("get-by-guid/{guid}")]
        public async Task<IActionResult> GetByGuid(Guid guid, [FromQuery] CategoryQueryParams queryParams)
        {
            CategoryDto category = await Mediator.Send(new GetCategoryByGuidQuery(guid, queryParams));
            return Ok(category);
        }

        [HttpGet("get-unassigned")]
        public async Task<IActionResult> GetUnassigned()
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetUnassignedCategoriesCommand());
            return Ok(categories);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CategoryCreateDto createCategory)
        {
            CategoryDto category = await Mediator.Send(new CreateCategoryCommand(createCategory));
            return CreatedAtAction(nameof(Create), category);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateCategoryDto categoryDto)
        {
            int result = await Mediator.Send(new UpdateCategoryCommand(id, categoryDto));
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCategoryCommand(id));
            return NoContent();
        }

        [HttpPatch("change-parent")]
        public async Task<IActionResult> ChangeParent(IEnumerable<ChangeParentCategoryPairDto> changeParents)
        {
            bool result = await Mediator.Send(new ChangeParentCategoryCommand(changeParents));
            return Ok(result);
        }
    }
}
