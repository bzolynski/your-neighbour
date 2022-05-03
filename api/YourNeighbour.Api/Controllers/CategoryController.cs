using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Categories.Commands.ChangeParent;
using YourNeighbour.Application.Features.Categories.Commands.CreateCategory;
using YourNeighbour.Application.Features.Categories.Commands.DeleteCategory;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Categories.Queries;
using YourNeighbour.Application.Features.Categories.Queries.GetCategory;
using YourNeighbour.Application.Features.Categories.Queries.GetManyCategories;
using YourNeighbour.Application.Features.Categories.Queries.GetUnassigned;

namespace YourNeighbour.Api.Controllers
{
    public class CategoryController : BaseController
    {
        [HttpGet("get")]
        public async Task<ActionResult<Response>> Get([FromQuery] CategoryQueryParams queryParams)
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetManyCategoriesQuery(queryParams));
            return Models.Response.Success(categories);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> Get(int id, [FromQuery] CategoryQueryParams queryParams)
        {
            CategoryDto category = await Mediator.Send(new GetCategoryQuery(id, queryParams));
            return Models.Response.Success(category);
        }

        [HttpGet("get-unassigned")]
        public async Task<ActionResult<Response>> GetUnassigned()
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetUnassignedCategoriesCommand());
            return Models.Response.Success(categories);
        }

        [HttpPut("create")]
        public async Task<ActionResult<Response>> Create(CategoryCreateDto createCategory)
        {
            CategoryDto category = await Mediator.Send(new CreateCategoryCommand(createCategory));
            return Models.Response.Success(category);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Response>> Delete(int id)
        {
            bool result = await Mediator.Send(new DeleteCategoryCommand(id));
            return Models.Response.Success(result);
        }

        [HttpPatch("change-parent")]
        public async Task<ActionResult<Response>> ChangeParent(IEnumerable<ChangeParentCategoryPairDto> changeParents)
        {
            bool result = await Mediator.Send(new ChangeParentCategoryCommand(changeParents));
            return Models.Response.Success(result);
        }
    }
}
