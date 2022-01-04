using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.UpdateCategoryDefinition
{
    public sealed record UpdateCategoryDefinitionCommand(int Id, CategoryDefinitionUpdateDto CategoryDefinition) : ICommand<CategoryDefinitionDto>;
}
