using PChart.Domain;
using Microsoft.EntityFrameworkCore;

namespace PChart.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Currency> Currencies { get; }

    DbSet<Asset> Assets { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}