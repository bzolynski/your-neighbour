using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Api.Tasks
{
    public class InitializeDatabaseStartupTask : IStartupTask
    {
        private readonly IServiceProvider serviceProvider;

        public InitializeDatabaseStartupTask(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }
        public async Task ExecuteAsync(CancellationToken cancellationToken = default)
        {
            using (IServiceScope scope = serviceProvider.CreateScope())
            {
                IApplicationDbContext dbContext = scope.ServiceProvider.GetService<IApplicationDbContext>();
                using (Microsoft.EntityFrameworkCore.Storage.IDbContextTransaction transaction = await dbContext.Database.BeginTransactionAsync())
                {
                    AdvertisementDefinition rootAdvertisementDefinition = await dbContext.Set<AdvertisementDefinition>().FirstOrDefaultAsync(x => x.Guid == AdvertisementDefinition.RootAdvertisementDefinitionGuid);
                    if (rootAdvertisementDefinition is null)
                    {
                        rootAdvertisementDefinition = new AdvertisementDefinition
                        {
                            Guid = AdvertisementDefinition.RootAdvertisementDefinitionGuid,
                            Basic = true,
                            DisplayName = "Podstawowe ogłoszenie",
                            Name = "Podstawowe",
                            IsActive = true,
                        };
                        await dbContext.Set<AdvertisementDefinition>().AddAsync(rootAdvertisementDefinition);
                    }

                    CategoryDefinition rootCategoryDefinition = await dbContext.Set<CategoryDefinition>().FirstOrDefaultAsync(x => x.Guid == CategoryDefinition.RootCategoryDefinitionGuid);
                    if (rootCategoryDefinition is null)
                    {
                        rootCategoryDefinition = new CategoryDefinition
                        {
                            Guid = CategoryDefinition.RootCategoryDefinitionGuid,
                            Basic = true,
                            DisplayName = "Wszystko",
                            Name = "Wszystko",
                            IsActive = true,
                        };
                        await dbContext.Set<CategoryDefinition>().AddAsync(rootCategoryDefinition);
                    }


                    Category rootCategory = await dbContext.Set<Category>().FirstOrDefaultAsync(x => x.Guid == Category.RootCategoryGuid);
                    if (rootCategory is null)
                    {
                        rootCategory = new Category
                        {
                            Guid = Category.RootCategoryGuid,
                            Definition = rootCategoryDefinition,
                            Name = "Wszystko",
                            Basic = true,
                            IsActive = true,
                        };
                        await dbContext.Set<Category>().AddAsync(rootCategory);
                    }
                    await dbContext.SaveChangesAsync(cancellationToken);
                    await transaction.CommitAsync();
                }
            }
        }
    }
}
