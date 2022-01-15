using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.CheckCategoryDefinitionDisplayNameExists
{
    public sealed record CheckCategoryDefinitionDisplayNameExistsQuery(string DisplayName) : IQuery<bool>;
}
