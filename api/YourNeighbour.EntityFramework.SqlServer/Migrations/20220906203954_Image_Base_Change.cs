using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Image_Base_Change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataUrl",
                table: "AdvertisementImage",
                newName: "FileExtension");

            migrationBuilder.AddColumn<byte[]>(
                name: "Bytes",
                table: "AdvertisementImage",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdvertisementImage",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Size",
                table: "AdvertisementImage",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bytes",
                table: "AdvertisementImage");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdvertisementImage");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "AdvertisementImage");

            migrationBuilder.RenameColumn(
                name: "FileExtension",
                table: "AdvertisementImage",
                newName: "DataUrl");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "45299e6b-8722-4f35-a3c7-457261859c30", new Guid("51e8c76a-7c0c-49d6-90cc-397697c93dfb") });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConcurrencyStamp", "Guid" },
                values: new object[] { "64635e53-3a89-4313-aa58-094d5087fd36", new Guid("206f17a5-181d-4377-bd06-cbe6ffdbdbed") });
        }
    }
}
