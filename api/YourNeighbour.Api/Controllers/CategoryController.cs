﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Categories.Commands.ChangeParent;
using YourNeighbour.Application.Features.Categories.Commands.CreateCategory;
using YourNeighbour.Application.Features.Categories.Commands.DeleteCategory;
using YourNeighbour.Application.Features.Categories.Dtos;
using YourNeighbour.Application.Features.Categories.Queries.GetAllCategories;
using YourNeighbour.Application.Features.Categories.Queries.GetCategoryById;
using YourNeighbour.Application.Features.Categories.Queries.GetUnassigned;

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

        [HttpPatch("change-parent/{id}/{parentId}")]
        public async Task<ActionResult<Response>> ChangeParent(int id, int parentId)
        {
            bool result = await Mediator.Send(new ChangeCategoryParentCommand(id, parentId));
            return Models.Response.Success(result);
        }
    }
}
