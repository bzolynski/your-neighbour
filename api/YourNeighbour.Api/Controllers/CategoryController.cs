using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Categories.Commands;
using YourNeighbour.Application.Features.Categories.Commands.DeleteCategory;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Categories.Queries.GetAllCategories;
using YourNeighbour.Application.Features.Categories.Queries.GetCategoryById;

namespace YourNeighbour.Api.Controllers
{ 
    public class CategoryController : BaseController
    {
        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> GetById(int id)
        {
            CategoryDto category = await Mediator.Send(new GetCategoryByIdQuery(id));
            return Models.Response.Success(category);
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<Response>> GetAll() 
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetAllCategoriesQuery());
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
    }
}
