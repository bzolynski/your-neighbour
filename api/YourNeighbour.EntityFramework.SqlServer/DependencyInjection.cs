using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.EntityFramework.SqlServer
{
    public static class DependencyInjection
    {
        public static void AddEntityFrameworkSqlServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IApplicationDbContext, SqlServerDbContext>();
            services.AddDbContext<SqlServerDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("SqlServer")))
                .AddDefaultIdentity<User>()
                .AddRoles<Role>()
                .AddSignInManager()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<SqlServerDbContext>();
        }
    }
}
