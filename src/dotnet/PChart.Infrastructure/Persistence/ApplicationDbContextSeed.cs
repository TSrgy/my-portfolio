using Microsoft.EntityFrameworkCore;
using PChart.Domain;

namespace PChart.Infrastructure.Persistence;

public class ApplicationDbContextSeed
{
    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
        if (!await context.Currencies.AnyAsync())
        {
            await context.Currencies.AddRangeAsync(new[]
            {
                new Currency("Euro", "EUR")
                {
                    PfxSymbol = "€"
                },
                new Currency("US Dollar", "USD")
                {
                    PfxSymbol = "$"
                },
                new Currency("Russian Ruble", "RUB")
                {
                    SfxSymbol = "р"
                }
            });

            await context.SaveChangesAsync();
        }
    }
}