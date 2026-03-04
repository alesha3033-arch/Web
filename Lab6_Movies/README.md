# Lab6_Movies - Фильмотека

## 🎬 Описание проекта
Веб-приложение для управления базой данных фильмов с полным функционалом CRUD, поиском и валидацией.

## 📋 Требования
- .NET SDK 8.0+
- SQLite (встроен)

## 🚀 Быстрый старт

### 1. Установка пакетов
```bash
cd Lab6_Movies
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### 2. Установка утилит
```bash
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
```

### 3. Создание модели Movie
Создайте файл `Models/Movie.cs`:
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab6_Movies.Models
{
    public class Movie
    {
        public int Id { get; set; }
        
        [StringLength(60, MinimumLength = 3)]
        [Required(ErrorMessage = "Название обязательно")]
        [Display(Name = "Название")]
        public string Title { get; set; } = string.Empty;
        
        [Display(Name = "Дата выпуска")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime ReleaseDate { get; set; }
        
        [RegularExpression(@"^[А-ЯA-Z]+[а-яa-zA-Zа-яА-Я\s]*$")]
        [Required(ErrorMessage = "Жанр обязателен")]
        [StringLength(30)]
        [Display(Name = "Жанр")]
        public string Genre { get; set; } = string.Empty;
        
        [Range(1, 1000)]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        [Display(Name = "Цена")]
        public decimal Price { get; set; }
        
        [StringLength(10)]
        [Required(ErrorMessage = "Рейтинг обязателен")]
        [Display(Name = "Рейтинг")]
        public string Rating { get; set; } = string.Empty;
    }
}
```

### 4. Создание контекста БД
Создайте файл `Data/MovieContext.cs`:
```csharp
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
```

### 5. Обновление Program.cs
Добавьте после `builder.Services.AddRazorPages();`:
```csharp
builder.Services.AddDbContext<MovieContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieContext") 
        ?? "Data Source=movies.db"));
```

Добавьте using:
```csharp
using Lab6_Movies.Data;
using Microsoft.EntityFrameworkCore;
```

### 6. Создание миграций
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 7. Генерация страниц CRUD
```bash
dotnet aspnet-codegenerator razorpage -m Movie -dc MovieContext -udl -outDir Pages/Movies --referenceScriptLibraries
```

### 8. Создание начальных данных
Создайте файл `Data/SeedData.cs`:
```csharp
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
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
```

Добавьте в Program.cs после `var app = builder.Build();`:
```csharp
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}
```

### 9. Запуск
```bash
dotnet run
```

Откройте: http://localhost:5000/Movies

## 📝 Функционал

✅ Просмотр списка фильмов
✅ Добавление нового фильма
✅ Редактирование фильма
✅ Удаление фильма
✅ Просмотр деталей
✅ Поиск по названию
✅ Фильтр по жанру
✅ Валидация данных
✅ Русский интерфейс

## 🎯 Дополнительные задания

### Добавить поиск
В `Pages/Movies/Index.cshtml.cs` добавьте:
```csharp
[BindProperty(SupportsGet = true)]
public string? SearchString { get; set; }

[BindProperty(SupportsGet = true)]
public string? MovieGenre { get; set; }

public SelectList? Genres { get; set; }

public async Task OnGetAsync()
{
    IQueryable<string> genreQuery = from m in _context.Movie
                                    orderby m.Genre
                                    select m.Genre;
    
    var movies = from m in _context.Movie
                 select m;
    
    if (!string.IsNullOrEmpty(SearchString))
    {
        movies = movies.Where(s => s.Title.Contains(SearchString));
    }
    
    if (!string.IsNullOrEmpty(MovieGenre))
    {
        movies = movies.Where(x => x.Genre == MovieGenre);
    }
    
    Genres = new SelectList(await genreQuery.Distinct().ToListAsync());
    Movie = await movies.ToListAsync();
}
```

В `Pages/Movies/Index.cshtml` добавьте форму поиска перед таблицей:
```html
<form>
    <p>
        <select asp-for="MovieGenre" asp-items="Model.Genres">
            <option value="">Все жанры</option>
        </select>
        Название: <input type="text" asp-for="SearchString" />
        <input type="submit" value="Поиск" class="btn btn-primary" />
        <a asp-page="./Index" class="btn btn-secondary">Сбросить</a>
    </p>
</form>
```

## 🎓 Защита лабораторной

Покажите преподавателю:
1. Работающее приложение
2. CRUD операции
3. Поиск и фильтрацию
4. Валидацию данных
5. Код моделей и контекста
6. Файл базы данных movies.db
