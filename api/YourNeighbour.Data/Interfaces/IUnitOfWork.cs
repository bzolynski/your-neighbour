﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace YourNeighbour.Data.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> Commit(CancellationToken cancellationToken = default);
    }
}
