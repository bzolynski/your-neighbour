using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Common.Dtos;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Items.Command.UpdateItem
{
    public sealed class UpdateItemHandler : ICommandHandler<UpdateItemCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;
        private readonly IMapper mapper;

        public UpdateItemHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.applicationDbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<int> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
        {
            Item item = await applicationDbContext.Set<Item>()
                .FirstOrDefaultAsync(i => i.Id == request.Id);
            if (item is null)
                throw new Exception("Item does not exists!");
            using (IDbContextTransaction transaction = await applicationDbContext.Database.BeginTransactionAsync())
            {
                item.Name = request.ItemDto.Name;
                item.Description = request.ItemDto.Description;
                item.CategoryId = request.ItemDto.CategoryId;

                List<ItemImage> itemImages = await applicationDbContext.Set<ItemImage>()
                    .Where(i => i.ItemId == request.Id)
                    .ToListAsync();

                foreach (UpdateImageDto img in request.ItemDto.Images)
                {
                    if (!Guid.TryParse(img.Guid, out Guid guid) || guid == Guid.Empty)
                        applicationDbContext.Set<ItemImage>().Add(new ItemImage { DataUrl = img.DataUrl, ItemId = request.Id });
                    else
                        itemImages.Remove(itemImages.First(x => x.Guid == guid));
                }
                applicationDbContext.Set<ItemImage>().RemoveRange(itemImages);
                await applicationDbContext.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }

            return request.Id;
        }
    }
}
