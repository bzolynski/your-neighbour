using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Dtos
{
    public sealed class CategoryDefinitionCreateDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; }
    }
}
