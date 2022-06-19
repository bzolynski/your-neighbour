using System;
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
            User user = await applicationDbContext.Set<User>()
                .Include(x => x.Chats)
                .FirstOrDefaultAsync(x => x.Email == userAccessor.GetEmail());
            if (user is null)
                throw new StatusCodeException("Nie można połączyć się z hubem. Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);

            foreach (Chat chat in user.Chats)
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
            await base.OnConnectedAsync();
        }

        public async Task<int> AddToRoom(int[] userIds)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    Chat chat = new Chat();
                    List<User> users = await applicationDbContext.Set<User>().Where(x => userIds.Any(id => x.Id == id)).ToListAsync();
                    foreach (User user in users)
                    {
                        if (user is null)
                            throw new StatusCodeException("Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);

                        chat.Users.Add(user);
                    }
                    await applicationDbContext.AddAsync(chat);

                    await applicationDbContext.SaveChangesAsync();
                    await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
                    await transaction.CommitAsync();
                    return chat.Id;
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
        public async Task SendMessage(MessageDto messageDto)
        {
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    Chat chat = await applicationDbContext.Set<Chat>().FirstOrDefaultAsync(x => x.Id == messageDto.ChatId);
                    if (chat is null)
                        throw new StatusCodeException("Czat nie istnieje!", System.Net.HttpStatusCode.BadRequest);

                    User user = await applicationDbContext.Set<User>().FirstOrDefaultAsync(x => x.Email == userAccessor.GetEmail());
                    if (user is null)
                        throw new StatusCodeException("Brak użytkownika!", System.Net.HttpStatusCode.BadRequest);

                    Message message = new Message
                    {
                        Chat = chat,
                        Sender = user,
                        Content = messageDto.Content,
                        DateTime = DateTime.Now
                    };
                    applicationDbContext.Set<Message>().Attach(message);
                    chat.Messages.Add(message);
                    await applicationDbContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    await Clients.Group(messageDto.ChatId.ToString()).SendAsync("ReceiveMessage", new MessageDto
                    {
                        ChatId = chat.Id,
                        Content = message.Content,
                        SenderId = user.Id,
                        Id = message.Id,
                        DateTime = message.DateTime
                    });
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
