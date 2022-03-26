using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using YourNeighbour.Api.Tasks;

namespace YourNeighbour.Api.Extensions
{
    public static class StartupTaskWebHostExtensions
    {
        public static async Task RunWithTasksAsync(this IHost host, CancellationToken cancellationToken = default)
        {
            IEnumerable<IStartupTask> startupTasks = host.Services.GetServices<IStartupTask>();

            foreach (IStartupTask startupTask in startupTasks)
                await startupTask.ExecuteAsync(cancellationToken);

            await host.RunAsync(cancellationToken);
        }
    }

}
