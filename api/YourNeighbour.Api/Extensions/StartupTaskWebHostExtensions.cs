using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Api.Tasks;

namespace YourNeighbour.Api.Extensions
{
    public static class StartupTaskWebHostExtensions
    {
        public static async Task RunWithTasksAsync(this IWebHost webHost, CancellationToken cancellationToken = default)
        {
            IEnumerable<IStartupTask> startupTasks = webHost.Services.GetServices<IStartupTask>();

            foreach (IStartupTask startupTask in startupTasks)
                await startupTask.ExecuteAsync(cancellationToken);

            await webHost.RunAsync(cancellationToken);
        }
    }

}
