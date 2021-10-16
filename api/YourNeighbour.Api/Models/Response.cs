using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YourNeighbour.Api.Models
{
    public enum ResponseStatus
    {
        success,
        error
    }
    public class Response
    {
        public string ErrorMessage { get; set; }
        public object ResponseObject { get; set; }
        public ResponseStatus ResponseStatus { get; set; }

        public static Response Error(string errorMessage)
        {
            return new Response
            {
                ResponseStatus = ResponseStatus.error,
                ErrorMessage = errorMessage
            };
        }

        public static Response Success(object responseObject)
        {
            return new Response
            {
                ResponseStatus = ResponseStatus.success,
                ResponseObject = responseObject
            };
        }
    }
}
