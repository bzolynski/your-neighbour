using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Api.Tasks;

namespace YourNeighbour.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddStartupTask<T>(this IServiceCollection services) where T : class, IStartupTask
            => services.AddTransient<IStartupTask, T>();
    }

}
