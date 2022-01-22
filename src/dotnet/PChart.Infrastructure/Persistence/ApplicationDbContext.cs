using System.Reflection;
using PChart.Application.Common.Interfaces;
using PChart.Domain;
using PChart.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace PChart.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    private readonly IDateTime _dateTime;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IDateTime dateTime) : base(options)
    {
        _dateTime = dateTime;
    }

    public DbSet<Currency> Currencies => Set<Currency>();
    public DbSet<Asset> Assets => Set<Asset>();

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.Created = _dateTime.Now;
                    break;

                case EntityState.Modified:
                    entry.Entity.LastModified = _dateTime.Now;
                    break;
            }
        }
        
        var result = await base.SaveChangesAsync(cancellationToken);

        return result;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
}
