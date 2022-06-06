using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YourNeighbour.Domain.Entities;

namespace YourNeighbour.EntityFramework.Configuration
{
    public sealed class FavoriteAdvertisementsConfiguration : IEntityTypeConfiguration<FavoriteAdvertisement>
    {
        public void Configure(EntityTypeBuilder<FavoriteAdvertisement> builder)
        {
            builder.HasKey(x => new { x.UserId, x.AdvertisementId });

            builder.HasOne(x => x.User)
                .WithOne()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Advertisement)
                .WithOne()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
