using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Remove_Phone_From_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
