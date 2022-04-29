using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class LocalizationEntityRebuild : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Localizations_Coordinates_CoordinatesId",
                table: "Localizations");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Localizations_CoordinatesId",
                table: "Localizations");

            migrationBuilder.DropColumn(
                name: "CoordinatesId",
                table: "Localizations");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlatNumber",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HouseNumber",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostCode",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Localizations");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Localizations");

            migrationBuilder.DropColumn(
                name: "FlatNumber",
                table: "Localizations");

            migrationBuilder.DropColumn(
                name: "HouseNumber",
                table: "Localizations");

            migrationBuilder.DropColumn(
                name: "PostCode",
                table: "Localizations");

            migrationBuilder.AddColumn<int>(
                name: "CoordinatesId",
                table: "Localizations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Localizations_CoordinatesId",
                table: "Localizations",
                column: "CoordinatesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Localizations_Coordinates_CoordinatesId",
                table: "Localizations",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id");
        }
    }
}
