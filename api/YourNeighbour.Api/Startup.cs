using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using YourNeighbour.Api.Middleware;
using YourNeighbour.Application;
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
            services.AddTransient<ExceptionHandlingMiddleware>();
            services.AddApplication();
            services.AddEntityFrameworkSqlServer(Configuration);
            services.AddInfrastructure();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowAnyOrigin();
                });
            });
            services.AddControllers();
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


            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
