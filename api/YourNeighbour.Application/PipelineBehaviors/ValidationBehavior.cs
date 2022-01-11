using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace YourNeighbour.Application.PipelineBehaviors
{
    public sealed class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : class, IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            this.validators = validators;
        }
        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (!validators.Any())
                return await next();

            ValidationContext<TRequest> context = new ValidationContext<TRequest>(request);

            List<FluentValidation.Results.ValidationFailure> errors = validators.Select(x => x.Validate(context))
                .SelectMany(x => x.Errors)
                .Where(x => x != null)
                .ToList();

            if (errors.Any())
                throw new ValidationException(string.Join("\r\n", errors.Select(x => x.ErrorMessage)));

            return await next();
        }
    }
}
