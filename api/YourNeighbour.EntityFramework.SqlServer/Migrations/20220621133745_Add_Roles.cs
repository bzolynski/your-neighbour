using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Add_Roles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Guid", "Name", "NormalizedName" },
                values: new object[] { 1, "12502af9-e40c-417f-beff-b38ce5a0d294", new Guid("99e97199-5ee7-4fe3-bcd7-27ec4cd19d8d"), "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Guid", "Name", "NormalizedName" },
                values: new object[] { 2, "c4e8900c-d8f4-4c32-92b1-aaa94c07836b", new Guid("884638d9-3527-44e8-b6e7-92a119d73aa5"), "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
