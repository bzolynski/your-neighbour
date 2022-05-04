using System;
using System.Collections.Generic;
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
        public bool IsActive { get; set; }
        public CategoryDto Parent { get; set; }
        public IEnumerable<CategoryDto> Children { get; set; }

        public int? ParentId { get; set; }
        public Guid? ParentGuid { get; set; }
    }
}
