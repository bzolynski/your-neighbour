using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class DefinitionBase : EntityBase
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
