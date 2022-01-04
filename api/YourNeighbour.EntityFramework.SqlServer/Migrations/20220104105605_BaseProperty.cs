using Microsoft.EntityFrameworkCore.Migrations;

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class BaseProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsInactive",
                table: "CategoryDefinitions",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "IsInactive",
                table: "AdvertisementDefinitions",
                newName: "IsActive");

            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "Roles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "CategoryDefinitions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Basic",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Basic",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "CategoryDefinitions");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "Basic",
                table: "AdvertisementDefinitions");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "CategoryDefinitions",
                newName: "IsInactive");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "AdvertisementDefinitions",
                newName: "IsInactive");
        }
    }
}
