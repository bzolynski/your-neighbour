using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Add_Main_Photo_Flag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Main",
                table: "AdvertisementImage",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "ae1185b5-5e41-4199-b2bd-1645abac77d9", new Guid("812f2c5f-fa28-41d4-83da-c32ce7ae2630") });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "0a78206e-7b64-419b-89a3-25b24c9b6f3a", new Guid("578405b3-dc01-4103-9f16-739cc7ad0a91") });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Main",
                table: "AdvertisementImage");

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
    }
}
