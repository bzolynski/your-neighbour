using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace YourNeighbour.Api.Middleware
{
    public class AccessTokenMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (context.Request.Cookies.TryGetValue("access-token", out string accessToken))
                context.Request.Headers.Authorization = $"Bearer { accessToken }";
            await next(context);
        }
    }
}
