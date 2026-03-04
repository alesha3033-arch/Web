using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lab6_Variant7.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Area = table.Column<double>(type: "REAL", nullable: false),
                    PlaceType = table.Column<string>(type: "TEXT", maxLength: 8, nullable: false),
                    RegionId = table.Column<int>(type: "INTEGER", nullable: true),
                    Population = table.Column<int>(type: "INTEGER", nullable: true),
                    Mayor = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    SettlementsCount = table.Column<int>(type: "INTEGER", nullable: true),
                    Leadership = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    District = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Places_Places_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Places",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Places_RegionId",
                table: "Places",
                column: "RegionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Places");
        }
    }
}
