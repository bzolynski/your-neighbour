using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Queries.GetAllCategoryDefinitions
{
    public sealed record GetAllCategoryDefinitionsQuery() : IQuery<IEnumerable<CategoryDefinitionDto>>;
}
