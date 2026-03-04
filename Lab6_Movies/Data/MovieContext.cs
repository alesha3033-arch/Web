using Microsoft.EntityFrameworkCore;
using Lab6_Movies.Models;

namespace Lab6_Movies.Data
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options)
            : base(options)
        {
        }

        public DbSet<Movie> Movie { get; set; } = default!;
    }
}
