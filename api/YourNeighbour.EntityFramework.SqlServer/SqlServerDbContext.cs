using Microsoft.EntityFrameworkCore;
using System;

namespace YourNeighbour.EntityFramework.SqlServer
{
    public class SqlServerDbContext : ApplicationDbContext
    {
        public SqlServerDbContext(DbContextOptions options) : base(options) { }
    }
}
