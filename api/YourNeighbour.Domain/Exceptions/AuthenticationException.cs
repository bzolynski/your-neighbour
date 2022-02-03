using System;
using System.Collections.Generic;

namespace YourNeighbour.Domain.Exceptions
{
    public sealed class AuthenticationException : Exception
    {
        public AuthenticationException() { }
        public AuthenticationException(string error)
        {
            Errors = new[] { error };
        }
        public AuthenticationException(IEnumerable<string> errors)
        {
            Errors = errors;
        }

        public IEnumerable<string> Errors { get; }
    }
}
