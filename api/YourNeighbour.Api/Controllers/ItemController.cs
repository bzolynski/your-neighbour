using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Application.Features.Items.Command.CreateItem;
using YourNeighbour.Application.Features.Items.Command.DeleteItem;
using YourNeighbour.Application.Features.Items.Command.UpdateItem;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Items.Queries;
using YourNeighbour.Application.Features.Items.Queries.GetItem;
using YourNeighbour.Application.Features.Items.Queries.GetManyByUser;
using YourNeighbour.Application.Features.Items.Queries.GetManyImagesByItem;

namespace YourNeighbour.Api.Controllers
{
    public class ItemController : BaseController
    {
        [HttpPut("create-for-user/{userId}")]
        public async Task<ActionResult<Response>> CreateForUser(ItemCreateDto itemCreate, int userId)
        {
            int result = await Mediator.Send(new CreateItemCommand(itemCreate, userId));
            return Models.Response.Success(result);
        }

        [HttpGet("get-many-by-user/{userId}")]
        public async Task<ActionResult<Response>> GetManyByUser(int userId, [FromQuery] ItemQueryParams queryParams)
        {
            IEnumerable<ItemDto> result = await Mediator.Send(new GetManyItemsByUserQuery(userId, queryParams));
            return Models.Response.Success(result);
        }

        [HttpGet("get-many-images-by-item/{id}")]
        public async Task<ActionResult<Response>> GetManyImagesByItem(int id)
        {
            IEnumerable<ImageDto> result = await Mediator.Send(new GetManyImagesByItemQuery(id));
            return Models.Response.Success(result);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> Get(int id, [FromQuery] ItemQueryParams queryParams)
        {
            ItemDto result = await Mediator.Send(new GetItemQuery(id, queryParams));
            return Models.Response.Success(result);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<Response>> Update(int id, UpdateItemDto itemDto)
        {
            int result = await Mediator.Send(new UpdateItemCommand(id, itemDto));
            return Models.Response.Success(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Response>> Update(int id)
        {
            bool result = await Mediator.Send(new DeleteItemCommand(id));
            return Models.Response.Success(result);
        }
    }
}
