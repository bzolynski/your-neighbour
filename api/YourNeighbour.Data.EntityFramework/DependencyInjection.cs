using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Data.EntityFramework.Repositories;
using YourNeighbour.Data.Interfaces.Repositories;

namespace YourNeighbour.Data.EntityFramework
{
    public static class DependencyInjection
    {
        public static void AddDataEntityFramework(this IServiceCollection services)
        {
            services.AddTransient<IAdvertisementDefinitionRepository, AdvertisementDefinitionRepository>();
            services.AddTransient<ICategoryDefinitionRepository, CategoryDefinitionRepository>();
        }
    }
}
