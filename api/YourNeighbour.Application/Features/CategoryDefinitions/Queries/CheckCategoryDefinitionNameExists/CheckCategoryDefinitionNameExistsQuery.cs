using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionNameExists
{
    public sealed record CheckCategoryDefinitionNameExistsQuery(string Name) : IQuery<bool>;
}
