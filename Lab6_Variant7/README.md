# Lab6_Variant7 - База данных мест (Вариант 7)

## 📍 Описание проекта
Веб-приложение для управления базой данных географических мест: области, города, деревни.

## 📋 Задание (Вариант 7)

### Классы:
- **Место** (площадь, название)
- **Область** (количество населенных пунктов, руководство)
- **Город** (область, количество жителей, мэр)
- **Деревня** (район)

### Запросы:
1. Названия всех городов заданной области
2. Суммарное количество жителей всех городов в области

## 🚀 Быстрый старт

### 1. Установка пакетов
```bash
cd Lab6_Variant7
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

### 3. Создание моделей

#### Models/Place.cs (базовый класс)
```csharp
using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Place
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Название обязательно")]
        [StringLength(100)]
        [Display(Name = "Название")]
        public string Name { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Площадь обязательна")]
        [Range(0.01, 1000000)]
        [Display(Name = "Площадь (км²)")]
        public double Area { get; set; }
    }
}
```

#### Models/Region.cs
```csharp
using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Region : Place
    {
        [Required]
        [Display(Name = "Количество населенных пунктов")]
        public int SettlementsCount { get; set; }
        
        [Required(ErrorMessage = "Руководство обязательно")]
        [StringLength(100)]
        [Display(Name = "Руководство")]
        public string Leadership { get; set; } = string.Empty;
        
        // Навигационное свойство
        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}
```

#### Models/City.cs
```csharp
using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class City : Place
    {
        [Required]
        [Display(Name = "ID Области")]
        public int RegionId { get; set; }
        
        [Required]
        [Display(Name = "Количество жителей")]
        public int Population { get; set; }
        
        [Required(ErrorMessage = "Мэр обязателен")]
        [StringLength(100)]
        [Display(Name = "Мэр")]
        public string Mayor { get; set; } = string.Empty;
        
        // Навигационное свойство
        [Display(Name = "Область")]
        public Region? Region { get; set; }
    }
}
```

#### Models/Village.cs
```csharp
using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Village : Place
    {
        [Required(ErrorMessage = "Район обязателен")]
        [StringLength(100)]
        [Display(Name = "Район")]
        public string District { get; set; } = string.Empty;
    }
}
```

### 4. Создание контекста БД

#### Data/PlaceContext.cs
```csharp
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
            
            // Настройка наследования TPH (Table Per Hierarchy)
            modelBuilder.Entity<Place>()
                .HasDiscriminator<string>("PlaceType")
                .HasValue<Place>("Place")
                .HasValue<Region>("Region")
                .HasValue<City>("City")
                .HasValue<Village>("Village");
            
            // Настройка связи Region -> Cities
            modelBuilder.Entity<City>()
                .HasOne(c => c.Region)
                .WithMany(r => r.Cities)
                .HasForeignKey(c => c.RegionId);
        }
    }
}
```

### 5. Обновление Program.cs

Добавьте после `builder.Services.AddRazorPages();`:
```csharp
builder.Services.AddDbContext<PlaceContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("PlaceContext") 
        ?? "Data Source=places.db"));
```

Добавьте using:
```csharp
using Lab6_Variant7.Data;
using Microsoft.EntityFrameworkCore;
```

### 6. Создание миграций
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 7. Генерация страниц CRUD

```bash
dotnet aspnet-codegenerator razorpage -m Region -dc PlaceContext -udl -outDir Pages/Regions --referenceScriptLibraries

dotnet aspnet-codegenerator razorpage -m City -dc PlaceContext -udl -outDir Pages/Cities --referenceScriptLibraries

dotnet aspnet-codegenerator razorpage -m Village -dc PlaceContext -udl -outDir Pages/Villages --referenceScriptLibraries
```

### 8. Создание начальных данных

#### Data/SeedData.cs
```csharp
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new PlaceContext(
                serviceProvider.GetRequiredService<DbContextOptions<PlaceContext>>()))
            {
                if (context.Regions.Any())
                {
                    return;
                }

                // Добавление областей
                var regions = new Region[]
                {
                    new Region
                    {
                        Name = "Московская область",
                        Area = 44379,
                        SettlementsCount = 70,
                        Leadership = "Воробьев А.Ю."
                    },
                    new Region
                    {
                        Name = "Ленинградская область",
                        Area = 83908,
                        SettlementsCount = 62,
                        Leadership = "Дрозденко А.Ю."
                    }
                };
                context.Regions.AddRange(regions);
                context.SaveChanges();

                // Добавление городов
                context.Cities.AddRange(
                    new City
                    {
                        Name = "Подольск",
                        Area = 40.4,
                        RegionId = regions[0].Id,
                        Population = 300000,
                        Mayor = "Иванов И.И."
                    },
                    new City
                    {
                        Name = "Химки",
                        Area = 109.4,
                        RegionId = regions[0].Id,
                        Population = 250000,
                        Mayor = "Петров П.П."
                    },
                    new City
                    {
                        Name = "Гатчина",
                        Area = 24.3,
                        RegionId = regions[1].Id,
                        Population = 93000,
                        Mayor = "Сидоров С.С."
                    }
                );

                // Добавление деревень
                context.Villages.AddRange(
                    new Village
                    {
                        Name = "Ивановка",
                        Area = 2.5,
                        District = "Подольский"
                    },
                    new Village
                    {
                        Name = "Петровка",
                        Area = 1.8,
                        District = "Химкинский"
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

### 9. Создание страницы запросов

#### Pages/Queries/Index.cshtml.cs
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages.Queries
{
    public class IndexModel : PageModel
    {
        private readonly PlaceContext _context;

        public IndexModel(PlaceContext context)
        {
            _context = context;
        }

        [BindProperty(SupportsGet = true)]
        public int? SelectedRegionId { get; set; }

        public SelectList? Regions { get; set; }
        public List<City>? Cities { get; set; }
        public int? TotalPopulation { get; set; }

        public async Task OnGetAsync()
        {
            Regions = new SelectList(await _context.Regions.ToListAsync(), "Id", "Name");

            if (SelectedRegionId.HasValue)
            {
                // Запрос 1: Названия всех городов заданной области
                Cities = await _context.Cities
                    .Where(c => c.RegionId == SelectedRegionId.Value)
                    .Include(c => c.Region)
                    .ToListAsync();

                // Запрос 2: Суммарное количество жителей
                TotalPopulation = await _context.Cities
                    .Where(c => c.RegionId == SelectedRegionId.Value)
                    .SumAsync(c => c.Population);
            }
        }
    }
}
```

#### Pages/Queries/Index.cshtml
```html
@page
@model Lab6_Variant7.Pages.Queries.IndexModel
@{
    ViewData["Title"] = "Запросы";
}

<h1>Запросы по базе данных</h1>

<form method="get">
    <div class="form-group">
        <label>Выберите область:</label>
        <select asp-for="SelectedRegionId" asp-items="Model.Regions" class="form-control">
            <option value="">-- Выберите область --</option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary mt-2">Выполнить запрос</button>
</form>

@if (Model.Cities != null && Model.Cities.Any())
{
    <h3 class="mt-4">Города области @Model.Cities.First().Region?.Name:</h3>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Название</th>
                <th>Площадь (км²)</th>
                <th>Население</th>
                <th>Мэр</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var city in Model.Cities)
            {
                <tr>
                    <td>@city.Name</td>
                    <td>@city.Area</td>
                    <td>@city.Population.ToString("N0")</td>
                    <td>@city.Mayor</td>
                </tr>
            }
        </tbody>
    </table>

    <div class="alert alert-info mt-3">
        <strong>Суммарное количество жителей:</strong> @Model.TotalPopulation?.ToString("N0")
    </div>
}
else if (Model.SelectedRegionId.HasValue)
{
    <div class="alert alert-warning mt-3">
        В выбранной области нет городов.
    </div>
}
```

### 10. Запуск
```bash
dotnet run
```

Откройте:
- Области: http://localhost:5000/Regions
- Города: http://localhost:5000/Cities
- Деревни: http://localhost:5000/Villages
- Запросы: http://localhost:5000/Queries

## 📝 Функционал

✅ Управление областями
✅ Управление городами
✅ Управление деревнями
✅ Запрос: города по области
✅ Запрос: суммарное население
✅ Валидация данных
✅ Русский интерфейс

## 🎓 Защита лабораторной

Покажите преподавателю:
1. Иерархию классов (Place → Region, City, Village)
2. CRUD операции для всех сущностей
3. Страницу запросов с фильтрацией
4. Подсчет суммарного населения
5. Связь Region → Cities
6. Файл базы данных places.db
