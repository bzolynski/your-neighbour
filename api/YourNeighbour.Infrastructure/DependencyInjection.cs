using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.EntityFramework.SqlServer;
using YourNeighbour.Infrastructure.Services;

namespace YourNeighbour.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient<IMapper, Mapper>();

            services.AddDefaultIdentity<User>()
                .AddRoles<Role>()
                .AddSignInManager()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<SqlServerDbContext>();
        }
    }
}
