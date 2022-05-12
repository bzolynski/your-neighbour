using System;
using System.Collections.Generic;

namespace YourNeighbour.Domain.Exceptions
{
    public sealed class AuthenticationException : Exception
    {
        public AuthenticationException() { }
        public AuthenticationException(string message) : base(message)
        {
            Errors = new[] { message };
        }

        public IEnumerable<string> Errors { get; }
    }
}
