using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Command.CreateItem
{
    public sealed class CreateItemHandler : ICommandHandler<CreateItemCommand, string>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public CreateItemHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<string> Handle(CreateItemCommand request, CancellationToken cancellationToken)
        {
            Item item = mapper.Map<Item>(request.ItemCreate);
            EntityEntry<Item> result = await applicationDbContext.Set<Item>().AddAsync(item);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return "Successfully created item!";//result.Entity;
        }
    }
}
