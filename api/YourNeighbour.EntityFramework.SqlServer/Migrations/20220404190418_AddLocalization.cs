using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class AddLocalization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocalizationId",
                table: "Advertisements",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Coordinates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Localizations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoordinatesId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Localizations_Coordinates_CoordinatesId",
                        column: x => x.CoordinatesId,
                        principalTable: "Coordinates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Localizations_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_LocalizationId",
                table: "Advertisements",
                column: "LocalizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Localizations_CoordinatesId",
                table: "Localizations",
                column: "CoordinatesId");

            migrationBuilder.CreateIndex(
                name: "IX_Localizations_UserId",
                table: "Localizations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements",
                column: "LocalizationId",
                principalTable: "Localizations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements");

            migrationBuilder.DropTable(
                name: "Localizations");

            migrationBuilder.DropTable(
                name: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_LocalizationId",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "LocalizationId",
                table: "Advertisements");
        }
    }
}
