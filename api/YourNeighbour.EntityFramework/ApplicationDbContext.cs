using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNeighbour.Data.EntityFramework.Interfaces;

namespace YourNeighbour.EntityFramework
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base (options) { }
        
        public async Task<bool> Commit()
        {
            var result = await SaveChangesAsync();
            return result > 0;
        }
    }
}
