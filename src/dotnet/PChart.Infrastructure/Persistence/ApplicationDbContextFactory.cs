using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using PChart.Infrastructure.Services;

namespace PChart.Infrastructure.Persistence;

[SuppressMessage("ReSharper", "UnusedType.Global", Justification = "Used by add migration process")]
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlite("Data Source=dev.db");

        return new ApplicationDbContext(optionsBuilder.Options, new DateTimeService());
    }
}