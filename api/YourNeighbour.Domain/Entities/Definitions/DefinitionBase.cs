﻿using YourNeighbour.Domain.Entities.Common;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class DefinitionBase : EntityBase
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
