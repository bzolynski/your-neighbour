using System;

namespace YourNeighbour.Application.Features.CategoryDefinitions.Dtos
{
    public sealed class CategoryDefinitionDto
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; }
    }
}
