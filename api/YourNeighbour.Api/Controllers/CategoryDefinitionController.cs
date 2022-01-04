using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.DeleteCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetAllCategoryDefinitions;
using YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetCategoryDefinitionById;

namespace YourNeighbour.Api.Controllers
{
    public sealed class CategoryDefinitionController : BaseController
    {
        [HttpGet("getById/{id}")]
        public async Task<ActionResult<Response>> GetById(int id)
        {
            CategoryDefinitionDto categoryDefinitions = await Mediator.Send(new GetCategoryDefinitionByIdQuery(id));
            return Models.Response.Success(categoryDefinitions);
        }
       
        [HttpGet("getAll")]
        public async Task<ActionResult<Response>> GetAll()
        {
            IEnumerable<CategoryDefinitionDto> categoryDefinitions = await Mediator.Send(new GetAllCategoryDefinitionsQuery());
            return Models.Response.Success(categoryDefinitions);
        }

        [HttpPut("create")]
        public async Task<ActionResult<Response>> Create(CategoryDefinitionCreateDto createCategoryDefinition)
        {
            CategoryDefinitionDto categoryDefinition = await Mediator.Send(new CreateCategoryDefinitionCommand(createCategoryDefinition));
            return Models.Response.Success(categoryDefinition);
        }

        [HttpPost("update/{id}")]
        public async Task<ActionResult<Response>> Update(int id, CategoryDefinitionUpdateDto updateCategoryDefinition)
        {
            CategoryDefinitionDto categoryDefinition = await Mediator.Send(new UpdateCategoryDefinitionCommand(id, updateCategoryDefinition));
            return Models.Response.Success(categoryDefinition);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Response>> Delete(int id)
        {
            bool categoryDefinition = await Mediator.Send(new DeleteCategoryDefinitionCommand(id));
            return Models.Response.Success(categoryDefinition);
        }
    }
}
