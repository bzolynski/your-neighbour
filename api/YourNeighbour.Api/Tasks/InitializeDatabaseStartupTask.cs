using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

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
               
            }
        }
    }
}
