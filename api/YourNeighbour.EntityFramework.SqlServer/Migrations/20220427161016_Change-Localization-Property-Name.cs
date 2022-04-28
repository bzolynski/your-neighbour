using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class ChangeLocalizationPropertyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Categories_CategoryId",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Localizations",
                newName: "Name");

            migrationBuilder.AlterColumn<int>(
                name: "LocalizationId",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_ItemId",
                table: "Advertisements",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Categories_CategoryId",
                table: "Advertisements",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Items_ItemId",
                table: "Advertisements",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements",
                column: "LocalizationId",
                principalTable: "Localizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Categories_CategoryId",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Items_ItemId",
                table: "Advertisements");

            migrationBuilder.DropForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements");

            migrationBuilder.DropIndex(
                name: "IX_Advertisements_ItemId",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Advertisements");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Localizations",
                newName: "Address");

            migrationBuilder.AlterColumn<int>(
                name: "LocalizationId",
                table: "Advertisements",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Categories_CategoryId",
                table: "Advertisements",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Advertisements_Localizations_LocalizationId",
                table: "Advertisements",
                column: "LocalizationId",
                principalTable: "Localizations",
                principalColumn: "Id");
        }
    }
}
