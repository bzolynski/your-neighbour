using System.Reflection;
using System.Reflection.Metadata;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition;
using YourNeighbour.Application.PipelineBehaviors;

namespace YourNeighbour.Application
{
    public static class DependencyInjection
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            ValidatorOptions.Global.CascadeMode = CascadeMode.Stop;
            services.AddValidatorsFromAssembly(typeof(AssemblyReference).Assembly);
            services.AddTransient(typeof(IValidator<CreateCategoryDefinitionCommand>), typeof(CreateCategoryDefinitionCommandValidator));
        }
    }
}
