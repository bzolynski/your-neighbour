using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using YourNeighbour.Api.Extensions;
using YourNeighbour.Api.Hubs;
using YourNeighbour.Api.Middleware;
using YourNeighbour.Api.Tasks;
using YourNeighbour.Application;
using YourNeighbour.Domain.Options;
using YourNeighbour.EntityFramework.SqlServer;
using YourNeighbour.Infrastructure;

namespace YourNeighbour.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AuthorizationOptions>(Configuration.GetSection("Authorization"));
            services.AddTransient<AccessTokenMiddleware>();
            services.AddTransient<ExceptionHandlingMiddleware>();
            services.AddApplication();
            services.AddEntityFrameworkSqlServer(Configuration);
            services.AddInfrastructure(Configuration);
            services.AddStartupTask<InitializeDatabaseStartupTask>();
            services.AddSignalR();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();


                });
            });

            services.AddControllers()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "YourNeighbour.Api", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "YourNeighbour.Api v1"));
            }


            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseMiddleware<AccessTokenMiddleware>();
            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
