using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using PChart.Infrastructure;
using PChart.Infrastructure.Persistence;

namespace PChart.Application.IntegrationTests;

public class DatabaseFixture : IDisposable
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly SqliteConnection _mainDbConnection;
    private readonly SqliteConnection _cleanDbConnection;

    public DatabaseFixture()
    {
        var builder = new ConfigurationBuilder()
            .AddInMemoryCollection(new KeyValuePair<string, string>[]
            {
                new("ConnectionStrings:DefaultConnection", "Data Source=TestDB;Mode=Memory;Cache=Shared")
            });

        var configuration = builder.Build();
        
        var services = new ServiceCollection();

        services.AddSingleton<IConfiguration>(configuration);
        services.AddApplication();
        services.AddInfrastructure(configuration);

        services.AddLogging();

        _scopeFactory = services.BuildServiceProvider()
            .GetService<IServiceScopeFactory>() ?? throw new NullReferenceException();

        _cleanDbConnection = new SqliteConnection("Data Source=:memory:");
        _cleanDbConnection.Open();
        _mainDbConnection = OpenConnectionAndEnsureDatabase();
        SaveDB(_mainDbConnection);
    }

    public async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
    {
        using var scope = _scopeFactory.CreateScope();

        var mediator = scope.ServiceProvider.GetService<ISender>();

        return await mediator.Send(request);
    }

    public void ResetState()
    {
        using var scope = _scopeFactory.CreateScope();
        RestoreDB(_mainDbConnection);
    }

    public async Task<TEntity> FindAsync<TEntity>(params object[] keyValues)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        return await context.FindAsync<TEntity>(keyValues);
    }

    public async Task AddAsync<TEntity>(TEntity entity)
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        context.Add(entity);

        await context.SaveChangesAsync();
    }

    public async Task<int> CountAsync<TEntity>()
        where TEntity : class
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        return await context.Set<TEntity>().CountAsync();
    }

    public void Dispose()
    {
        _cleanDbConnection.Dispose();
        _mainDbConnection.Dispose();
    }
    
    private void SaveDB(SqliteConnection srcConnection)
    {
        srcConnection.BackupDatabase(_cleanDbConnection);
    }

    private void RestoreDB(SqliteConnection destConnection)
    {
        _cleanDbConnection.BackupDatabase(destConnection);
    }

    private SqliteConnection OpenConnectionAndEnsureDatabase()
    {
        using var scope = _scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();

        var connection = new SqliteConnection(context.Database.GetConnectionString());
        connection.Open();

        context.Database.Migrate();

        return connection;
    }


}