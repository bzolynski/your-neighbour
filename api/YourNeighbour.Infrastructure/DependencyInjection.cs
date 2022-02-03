using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Options;
using YourNeighbour.EntityFramework.SqlServer;
using YourNeighbour.Infrastructure.Services;

namespace YourNeighbour.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            AuthorizationOptions tokenConfiguration = configuration.GetSection("Authorization")
                .Get<AuthorizationOptions>();

            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddTransient<IMapper, Mapper>();
            services.AddTransient<ITokenManager, TokenManager>();
            services.AddTransient<IUserAccessor, UserAccessor>();

            services.AddDefaultIdentity<User>()
                .AddRoles<Role>()
                .AddSignInManager()
                .AddUserManager<UserManager<User>>()
                .AddEntityFrameworkStores<SqlServerDbContext>();

            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = true;
                options.SignIn.RequireConfirmedEmail = true;
            });

            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenConfiguration.AccessTokenKey)),
                ValidIssuer = tokenConfiguration.Issuer,
                ValidateIssuer = true,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
            };

            services.AddSingleton(tokenValidationParameters);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = tokenValidationParameters;
                });
        }
    }
}
