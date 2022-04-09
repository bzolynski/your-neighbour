using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Api.Models;
using YourNeighbour.Application.Features.Items.Command.CreateItem;
using YourNeighbour.Application.Features.Items.Dtos;
using YourNeighbour.Application.Features.Items.Queries.GetManyByUser;

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
        public async Task<ActionResult<Response>> GetManyByUser(int id)
        {
            IEnumerable<ItemDto> result = await Mediator.Send(new GetManyItemsByUserQuery(id));
            return Models.Response.Success(result);
        }
    }
}
