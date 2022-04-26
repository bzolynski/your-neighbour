﻿using System;
using System.Collections.Generic;
using YourNeighbour.Domain.Entities.Common;
using YourNeighbour.Domain.Entities.Definitions;

namespace YourNeighbour.Domain.Entities
{
    public class Category : EntityBase
    {
        public static readonly Guid RootCategoryGuid = new Guid("00000000-0000-0000-0000-000000000000");
        public Category()
        {
            Subcategories = new HashSet<Category>();
            Advertisements = new HashSet<Advertisement>();
        }

        public string Name { get; set; }
        public bool IsActive { get; set; }
        public CategoryDefinition Definition { get; set; }
        public Category Parent { get; set; }
        public ICollection<Category> Subcategories { get; }
        public ICollection<Advertisement> Advertisements { get; }
        public bool Basic { get; set; } = false;

        public int DefinitionId { get; set; }
        public int? ParentId { get; set; }
    }
}
