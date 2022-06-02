using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities.Identity;
using YourNeighbour.Domain.Exceptions;

namespace YourNeighbour.Application.Features.Users.Commands
{
    public sealed class UpdateUserHandler : ICommandHandler<UpdateUserCommand, int>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public UpdateUserHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<int> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            User user = await applicationDbContext.Set<User>().FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (user is null)
                throw new StatusCodeException("Użytkownik nie istnieje w bazie!", System.Net.HttpStatusCode.NotFound);
            user.PhoneNumber = request.UserDto.PhoneNumber;
            user.FirstName = request.UserDto.FirstName;
            user.LastName = request.UserDto.LastName;
            applicationDbContext.Update(user);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return user.Id;
        }
    }
}
