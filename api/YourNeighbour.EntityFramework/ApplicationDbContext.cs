﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using YourNeighbour.Data.EntityFramework.Interfaces;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.EntityFramework
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }

        public async Task<bool> Commit(CancellationToken cancellationToken = default)
        {
            var result = await SaveChangesAsync(cancellationToken);
            return result > 0;
        }
    }
}
