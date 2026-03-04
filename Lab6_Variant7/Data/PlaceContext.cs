using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Data
{
    public class PlaceContext : DbContext
    {
        public PlaceContext(DbContextOptions<PlaceContext> options)
            : base(options)
        {
        }

        public DbSet<Place> Places { get; set; } = default!;
        public DbSet<Region> Regions { get; set; } = default!;
        public DbSet<City> Cities { get; set; } = default!;
        public DbSet<Village> Villages { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Place>()
                .HasDiscriminator<string>("PlaceType")
                .HasValue<Place>("Place")
                .HasValue<Region>("Region")
                .HasValue<City>("City")
                .HasValue<Village>("Village");
            
            modelBuilder.Entity<City>()
                .HasOne(c => c.Region)
                .WithMany(r => r.Cities)
                .HasForeignKey(c => c.RegionId);
        }
    }
}
