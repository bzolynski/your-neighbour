using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;

namespace YourNeighbour.Application.Features.Categories.Commands.DeleteCategory
{
    public sealed record DeleteCategoryCommand(int Id) : ICommand<bool>;
}
