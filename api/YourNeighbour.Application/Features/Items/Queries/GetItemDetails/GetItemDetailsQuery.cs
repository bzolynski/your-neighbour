using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Items.Dtos;

namespace YourNeighbour.Application.Features.Items.Queries.GetItemDetails
{
    public sealed record GetItemDetailsQuery(int Id) : IQuery<ItemDetailsDto>;
}
