using System;

namespace YourNeighbour.Application.Abstractions
{
    public interface IUserAccessor
    {
        string GetEmail();
        Guid GetJti();
    }
}
