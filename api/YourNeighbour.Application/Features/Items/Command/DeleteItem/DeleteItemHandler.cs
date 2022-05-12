using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Items.Command.DeleteItem
{
    public sealed class DeleteItemHandler : ICommandHandler<DeleteItemCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public DeleteItemHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
        {
            if (await applicationDbContext.Set<Advertisement>().FirstOrDefaultAsync(x => x.ItemId == request.Id) is not null)
                throw new StatusCodeException("Item is used in advertisement!", System.Net.HttpStatusCode.BadRequest);
            Item item = await applicationDbContext.Set<Item>().FindAsync(request.Id);

            applicationDbContext.Set<Item>().Remove(item);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
