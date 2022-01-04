using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Commands.DeleteCategoryDefinition
{
    public sealed record DeleteCategoryDefinitionCommand(int Id) : ICommand<bool>;
}
