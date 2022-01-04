using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.CreateCategoryDefinition
{
    public sealed record CreateCategoryDefinitionCommand(CategoryDefinitionCreateDto CategoryDefinition) : ICommand<CategoryDefinitionDto>;

}
