using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YourNeighbour.Domain.Entities.Definitions
{
    public class DefinitionBase : EntityBase
    {
        public bool IsInactive { get; set; }
    }
}
