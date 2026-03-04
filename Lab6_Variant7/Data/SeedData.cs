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

                var region1 = new Region
                {
                    Name = "Московская область",
                    Area = 44379,
                    SettlementsCount = 70,
                    Leadership = "Воробьев А.Ю."
                };
                
                var region2 = new Region
                {
                    Name = "Ленинградская область",
                    Area = 83908,
                    SettlementsCount = 62,
                    Leadership = "Дрозденко А.Ю."
                };
                
                context.Regions.AddRange(region1, region2);
                context.SaveChanges();

                context.Cities.AddRange(
                    new City
                    {
                        Name = "Подольск",
                        Area = 40.4,
                        RegionId = region1.Id,
                        Population = 300000,
                        Mayor = "Иванов И.И."
                    },
                    new City
                    {
                        Name = "Химки",
                        Area = 109.4,
                        RegionId = region1.Id,
                        Population = 250000,
                        Mayor = "Петров П.П."
                    },
                    new City
                    {
                        Name = "Гатчина",
                        Area = 24.3,
                        RegionId = region2.Id,
                        Population = 93000,
                        Mayor = "Сидоров С.С."
                    }
                );

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
