using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourNeighbour.Domain.Entities.Identity;

namespace YourNeighbour.EntityFramework.Configuration
{
    public sealed class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");
            builder.HasData(new Role
            {
                Id = 1,
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR"
            }, new Role
            {
                Id = 2,
                Name = "User",
                NormalizedName = "USER"
            });
        }
    }
}
