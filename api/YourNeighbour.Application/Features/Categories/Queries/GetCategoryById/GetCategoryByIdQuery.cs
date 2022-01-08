using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Application.Abstractions;
using YourNeighbour.Application.Features.Categories.Dtos;

namespace YourNeighbour.Application.Features.Categories.Queries.GetCategoryById
{
    public sealed record GetCategoryByIdQuery(int Id) : IQuery<CategoryDto>;
}
