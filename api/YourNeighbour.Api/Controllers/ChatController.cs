using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Application.Features.Chats.Queries.GetChat;
using YourNeighbour.Application.Features.Chats.Queries.GetChatIdByUsers;
using YourNeighbour.Application.Features.Chats.Queries.GetChats;
using YourNeighbour.Application.Features.Chats.Queries.GetMessages;

namespace YourNeighbour.Api.Controllers
{

    [Authorize]
    public sealed class ChatController : BaseController
    {
        [HttpGet("get-chat-id")]
        public async Task<IActionResult> GetChatId([FromQuery] int[] ids)
        {
            int result = await Mediator.Send(new GetChatIdByUsersQuery(ids));
            return Ok(result);
        }
        [HttpGet("get-chat/{id}")]
        public async Task<IActionResult> GetChat(int id)
        {
            ChatDto result = await Mediator.Send(new GetChatQuery(id));
            return Ok(result);
        }
        [HttpGet("get-chats")]
        public async Task<IActionResult> GetChats()
        {
            IEnumerable<ChatDto> result = await Mediator.Send(new GetChatsQuery());
            return Ok(result);
        }

        [HttpGet("get-messages/{chatId}")]
        public async Task<IActionResult> GetMessages(int chatId)
        {
            IEnumerable<MessageDto> result = await Mediator.Send(new GetMessagesQuery(chatId));
            return Ok(result);
        }
    }
}
