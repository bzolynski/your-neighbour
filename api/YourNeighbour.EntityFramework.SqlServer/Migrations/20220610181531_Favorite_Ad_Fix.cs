using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Favorite_Ad_Fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FavoriteAdvertisements_AdvertisementId",
                table: "FavoriteAdvertisements");

            migrationBuilder.DropIndex(
                name: "IX_FavoriteAdvertisements_UserId",
                table: "FavoriteAdvertisements");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteAdvertisements_AdvertisementId",
                table: "FavoriteAdvertisements",
                column: "AdvertisementId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FavoriteAdvertisements_AdvertisementId",
                table: "FavoriteAdvertisements");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteAdvertisements_AdvertisementId",
                table: "FavoriteAdvertisements",
                column: "AdvertisementId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteAdvertisements_UserId",
                table: "FavoriteAdvertisements",
                column: "UserId",
                unique: true);
        }
    }
}
