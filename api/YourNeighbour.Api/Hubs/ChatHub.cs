using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Chats.Dtos;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Api.Hubs
{
    public class MessageTest
    {
        public string Content { get; set; }
        public string ChatName { get; set; }
    }

    // [Authorize]
    public sealed class ChatHub : Hub
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IUserAccessor userAccessor;

        public ChatHub(IApplicationDbContext applicationDbContext, IUserAccessor userAccessor)
        {
            this.applicationDbContext = applicationDbContext;
            this.userAccessor = userAccessor;
        }

        public override async Task OnConnectedAsync()
        {
            List<User> xxx = applicationDbContext.Set<User>().Where(x => true).ToList();
            User user = await applicationDbContext.Set<User>()
                .Include(x => x.Chats)
                .FirstOrDefaultAsync(x => x.Email == userAccessor.GetEmail());
            if (user is null)
                throw new StatusCodeException("Nie można połączyć się z hubem. Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);

            foreach (Chat chat in user.Chats)
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Name);
            await base.OnConnectedAsync();
        }

        public async Task AddToRoom(string chatName)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    Chat chat = await applicationDbContext.Set<Chat>().FirstOrDefaultAsync(x => x.Name == chatName);

                    if (chat is null)
                    {
                        User user = await applicationDbContext.Set<User>().FirstOrDefaultAsync(x => x.Email == userAccessor.GetEmail());
                        if (user is null)
                            throw new StatusCodeException("Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);
                        chat = new Chat()
                        {
                            Name = chatName
                        };
                        chat.Users.Add(user);
                        await applicationDbContext.AddAsync(chat);
                    }

                    await applicationDbContext.SaveChangesAsync();
                    await Groups.AddToGroupAsync(Context.ConnectionId, chatName);
                    await transaction.CommitAsync();

                }
                catch (System.Exception ex)
                {
                    await transaction.RollbackAsync();
                }
            }
        }
        public async Task SendMessage(MessageTest messageTest)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    Chat chat = await applicationDbContext.Set<Chat>().FirstOrDefaultAsync(x => x.Name == messageTest.ChatName);
                    if (chat is null)
                        throw new StatusCodeException("Czat nie istnieje!", System.Net.HttpStatusCode.BadRequest);

                    User user = await applicationDbContext.Set<User>().FirstOrDefaultAsync(x => x.Email == userAccessor.GetEmail());
                    if (user is null)
                        throw new StatusCodeException("Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);

                    Message message = new Message
                    {
                        Chat = chat,
                        Sender = user,
                        Content = messageTest.Content,
                    };
                    applicationDbContext.Set<Message>().Attach(message);
                    chat.Messages.Add(message);
                    await applicationDbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    await Clients.Group(messageTest.ChatName).SendAsync("ReceiveMessage", new MessageDto
                    {
                        ChatName = chat.Name,
                        Content = message.Content,
                        SenderId = user.Id,
                        Id = message.Id
                    });
                }
                catch (System.Exception ex)
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
