using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.EntityFramework.Configuration
{
    public sealed class AdvertisementConfiguration : IEntityTypeConfiguration<Advertisement>
    {
        public void Configure(EntityTypeBuilder<Advertisement> builder)
        {
            builder.HasOne(a => a.Localization)
                .WithMany(l => l.Advertisements)
                .HasForeignKey(a => a.LocalizationId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
