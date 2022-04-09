using System.Collections.Generic;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Common.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetManyImagesByItem
{
    public sealed record GetManyImagesByItemQuery(int Id) : IQuery<IEnumerable<ImageDto>>;
}
