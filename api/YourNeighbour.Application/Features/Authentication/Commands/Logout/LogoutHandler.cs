using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.Application.Features.Authentication.Commands.Logout
{
    public sealed class LogoutHandler : ICommandHandler<LogoutCommand, bool>
    {
        private readonly IApplicationDbContext applicationDbContext;

        public LogoutHandler(IApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            RefreshToken token = await applicationDbContext.Set<RefreshToken>().SingleOrDefaultAsync(x => x.Token == request.LogoutDto.RefreshToken);
            token.Invalidated = true;
            applicationDbContext.Set<RefreshToken>().Update(token);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
