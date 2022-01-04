using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Application.Features.CategoryDefinitions.Dtos;

namespace YourNeighbour.Application.Features.Categories.Dtos
{
    public sealed class CategoryDto
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public bool Basic { get; set; }
        public string Name { get; set; }
        public CategoryDefinitionDto Definition { get; set; }
        public CategoryDto Parent { get; set; }
        public ICollection<CategoryDto> Subcategories { get; }
        public bool IsActive { get; set; }
    }
}
