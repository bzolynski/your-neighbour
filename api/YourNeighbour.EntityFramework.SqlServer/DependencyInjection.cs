using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.EntityFramework.SqlServer
{
    public static class DependencyInjection
    {
        public static void AddEntityFrameworkSqlServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IApplicationDbContext, SqlServerDbContext>();
            services.AddDbContext<SqlServerDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlServer")));

        }
    }
}
