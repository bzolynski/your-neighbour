using AutoMapper.QueryableExtensions;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Infrastructure.Services
{
    public sealed class Mapper : IMapper
    {
        private readonly AutoMapper.IMapper mapper;

        public Mapper(AutoMapper.IMapper mapper)
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
