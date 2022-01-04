using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Categories.Queries.GetAllCategories;

namespace YourNeighbour.Api.Controllers
{
    public class CategoryController : BaseController
    {
        [HttpGet("getAll")]
        public async Task<ActionResult<Response>> GetAll()
        {
            IEnumerable<CategoryDto> categories = await Mediator.Send(new GetAllCategoriesQuery());
            return Models.Response.Success(categories);
        }
    }
}
