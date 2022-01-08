using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Application.Features.Categories.Dtos
{
    public sealed class CategoryCreateDto
    {
        public string Name { get; set; }
        public int DefinitionId { get; set; }
        public bool IsActive { get; set; }
    }
}
