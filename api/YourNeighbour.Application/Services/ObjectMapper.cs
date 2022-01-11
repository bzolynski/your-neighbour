using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Services
{
    public sealed class ObjectMapper : IObjectMapper
    {
        private readonly AutoMapper.IMapper mapper;

        public ObjectMapper(AutoMapper.IMapper mapper)
        {
            this.mapper = mapper;
        }
        public IQueryable<T> ProjectTo<T>(IQueryable source) where T : class
        {
            return source.ProjectTo<T>(mapper.ConfigurationProvider);
        }

        public T Map<T>(object source) where T : class
        {
            return mapper.Map<T>(source);
        }
    }
}
