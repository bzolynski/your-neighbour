using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Remove_Name_From_Localization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Localizations");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "f1e55ff9-0dcb-4118-a79c-c3013a298760", new Guid("b8e4a448-bd5c-442c-8a80-28635ac58301") });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "7bbfd773-a999-4827-afc1-f53039d8db25", new Guid("1987e266-a149-48c4-a9fc-03b3450be282") });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Localizations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "c537d18f-b215-4c9f-bdec-6fd759845ae5", new Guid("33820a97-a6d5-4c20-8fc2-f1b2d48ddbf1") });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "2e4cb495-7a86-487b-b709-b19dcbc89f29", new Guid("eaf35c5c-b40d-46a6-b13d-0c8326b54674") });
        }
    }
}
