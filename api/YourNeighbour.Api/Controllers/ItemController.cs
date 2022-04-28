using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Application.Features.Items.Command.CreateItem;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Items.Queries;
using YourNeighbour.Application.Features.Items.Queries.GetItem;
using YourNeighbour.Application.Features.Items.Queries.GetItemDetails;
using YourNeighbour.Application.Features.Items.Queries.GetItemsListingByUser;
using YourNeighbour.Application.Features.Items.Queries.GetManyByUser;
using YourNeighbour.Application.Features.Items.Queries.GetManyImagesByItem;

namespace YourNeighbour.Api.Controllers
{
    public class ItemController : BaseController
    {
        [HttpPut("create")]
        public async Task<ActionResult<Response>> Create(ItemCreateDto itemCreate)
        {
            string result = await Mediator.Send(new CreateItemCommand(itemCreate));
            return Models.Response.Success(result);
        }

        [HttpGet("get-many-by-user/{id}")]
        public async Task<ActionResult<Response>> GetManyByUser(int id, [FromQuery] ItemQueryParams queryParams)
        {
            IEnumerable<ItemDto> result = await Mediator.Send(new GetManyItemsByUserQuery(id, queryParams));
            return Models.Response.Success(result);
        }

        [HttpGet("get-listing-by-user/{id}")]
        public async Task<ActionResult<Response>> GetListingByUser(int id)
        {
            IEnumerable<ItemListingDto> result = await Mediator.Send(new GetItemsListingByUser(id));
            return Models.Response.Success(result);
        }

        [HttpGet("get-many-images-by-item/{id}")]
        public async Task<ActionResult<Response>> GetManyImagesByItem(int id)
        {
            IEnumerable<ImageDto> result = await Mediator.Send(new GetManyImagesByItemQuery(id));
            return Models.Response.Success(result);
        }

        [HttpGet("get-details/{id}")]
        public async Task<ActionResult<Response>> GetDetails(int id)
        {
            ItemDetailsDto result = await Mediator.Send(new GetItemDetailsQuery(id));
            return Models.Response.Success(result);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Response>> Get(int id, [FromQuery] ItemQueryParams queryParams)
        {
            ItemDto result = await Mediator.Send(new GetItemQuery(id, queryParams));
            return Models.Response.Success(result);
        }
    }
}
