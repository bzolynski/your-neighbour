using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using YourNeighbour.Api.Models;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Api.Middleware
{
    public sealed class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> logger;

        public ExceptionHandlingMiddleware(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger<ExceptionHandlingMiddleware>();
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                Response response = Response.Error(FormatValidationErrorMessages(ex.Errors));
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(response);

            }
            catch (AuthenticationException ex)
            {
                Response response = Response.Error(ex.Errors);
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(response);
            }
            catch (StatusCodeException ex)
            {
                Response response = Response.Error(ex.Message);
                context.Response.StatusCode = (int)ex.StatusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
                Response response = Response.Error(ex.Message);
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsJsonAsync(response);
            }
        }

        private IEnumerable<string> FormatValidationErrorMessages(IEnumerable<ValidationFailure> errors)
        {
            return errors.Select(x => String.Join(": ", new[] { x.PropertyName, x.ErrorMessage }));
        }
    }
}
