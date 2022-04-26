using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class RemoveEntityCustomClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Basic",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "AdvertisementDefinitions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "Advertisements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "AdvertisementDefinitions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
