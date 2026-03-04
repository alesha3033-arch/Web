using Microsoft.EntityFrameworkCore;
using Lab6_Movies.Models;

namespace Lab6_Movies.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MovieContext(
                serviceProvider.GetRequiredService<DbContextOptions<MovieContext>>()))
            {
                if (context.Movie.Any())
                {
                    return;
                }

                context.Movie.AddRange(
                    new Movie
                    {
                        Title = "Криминальное чтиво",
                        ReleaseDate = DateTime.Parse("1994-10-14"),
                        Genre = "Криминал",
                        Price = 9.99M,
                        Rating = "R"
                    },
                    new Movie
                    {
                        Title = "Побег из Шоушенка",
                        ReleaseDate = DateTime.Parse("1994-09-23"),
                        Genre = "Драма",
                        Price = 8.99M,
                        Rating = "R"
                    },
                    new Movie
                    {
                        Title = "Форрест Гамп",
                        ReleaseDate = DateTime.Parse("1994-07-06"),
                        Genre = "Драма",
                        Price = 7.99M,
                        Rating = "PG-13"
                    },
                    new Movie
                    {
                        Title = "Интерстеллар",
                        ReleaseDate = DateTime.Parse("2014-11-07"),
                        Genre = "Фантастика",
                        Price = 12.99M,
                        Rating = "PG-13"
                    },
                    new Movie
                    {
                        Title = "Начало",
                        ReleaseDate = DateTime.Parse("2010-07-16"),
                        Genre = "Фантастика",
                        Price = 11.99M,
                        Rating = "PG-13"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
