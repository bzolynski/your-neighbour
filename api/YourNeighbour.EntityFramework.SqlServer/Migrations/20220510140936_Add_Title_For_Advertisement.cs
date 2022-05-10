using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YourNeighbour.EntityFramework.SqlServer.Migrations
{
    public partial class Add_Title_For_Advertisement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Advertisements",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Advertisements");
        }
    }
}
