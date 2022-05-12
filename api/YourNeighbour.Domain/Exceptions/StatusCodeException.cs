using System;
using System.Net;

namespace YourNeighbour.Domain.Exceptions
{
    public sealed class StatusCodeException : Exception
    {
        public StatusCodeException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.BadRequest;
        }
        public StatusCodeException(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }

        public HttpStatusCode StatusCode { get; }
    }
}
