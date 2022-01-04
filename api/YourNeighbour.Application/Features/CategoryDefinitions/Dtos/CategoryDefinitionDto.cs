using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Dtos
{
    public sealed class CategoryDefinitionDto
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public bool Basic { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsInactive { get; set; }
    }
}
