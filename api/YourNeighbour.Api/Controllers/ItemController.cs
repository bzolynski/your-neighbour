using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Common;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Application.Features.Items.Command.CreateItem;
using YourNeighbour.Application.Features.Items.Command.DeleteItem;
using YourNeighbour.Application.Features.Items.Command.UpdateItem;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Items.Queries;
using YourNeighbour.Application.Features.Items.Queries.GetItem;
using YourNeighbour.Application.Features.Items.Queries.GetItemByAdvertisement;
using YourNeighbour.Application.Features.Items.Queries.GetManyByUser;
using YourNeighbour.Application.Features.Items.Queries.GetManyImagesByItem;

namespace YourNeighbour.Api.Controllers
{
    public class ItemController : BaseController
    {
        [HttpPut("create-for-user/{userId}")]
        public async Task<IActionResult> CreateForUser(ItemCreateDto itemCreate, int userId)
        {
            int result = await Mediator.Send(new CreateItemCommand(itemCreate, userId));
            return CreatedAtAction(nameof(CreateForUser), result);
        }

        [HttpGet("get-by-advertisement/{advertisementId}")]
        public async Task<IActionResult> GetByAdvertisement(int advertisementId, [FromQuery] ItemQueryParams queryParams)
        {
            ItemDto result = await Mediator.Send(new GetItemByAdvertisementQuery(advertisementId, queryParams));
            return Ok(result);
        }

        [HttpGet("get-many-by-user/{userId}")]
        public async Task<IActionResult> GetManyByUser(int userId, [FromQuery] ItemQueryParams queryParams)
        {
            IEnumerable<ItemDto> result = await Mediator.Send(new GetManyItemsByUserQuery(userId, queryParams));
            return Ok(result);
        }

        [HttpGet("get-many-images-by-item/{id}")]
        public async Task<IActionResult> GetManyImagesByItem(int id, [FromQuery] ImageQueryParams queryParams)
        {
            IEnumerable<ImageDto> result = await Mediator.Send(new GetManyImagesByItemQuery(id, queryParams));
            return Ok(result);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] ItemQueryParams queryParams)
        {
            ItemDto result = await Mediator.Send(new GetItemQuery(id, queryParams));
            return Ok(result);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, UpdateItemDto itemDto)
        {
            int result = await Mediator.Send(new UpdateItemCommand(id, itemDto));
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Update(int id)
        {
            bool result = await Mediator.Send(new DeleteItemCommand(id));
            return Ok(result);
        }
    }
}
