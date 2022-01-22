using ElectronCgi.DotNet;
using MediatR;
using PChart.Application.Assets.Queries.GetAssets;
using PChart.Application.Currencies.Queries.GetCurrencies;
using PChart.Infrastructure.Persistence;

namespace PChart.ElectronCgiConnect;
public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly ISender _mediator;
    private readonly IServiceProvider _serviceProvider;
    private readonly Connection _connection;

    public Worker(ILogger<Worker> logger, ISender mediator, IServiceProvider serviceProvider)
    {
        _logger = logger;
        _mediator = mediator;
        _serviceProvider = serviceProvider;

        _connection = new ConnectionBuilder()
            .WithLogging()
            .Build();

        
    }

    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await base.StartAsync(cancellationToken);

        await using var dbContext = _serviceProvider.GetService<ApplicationDbContext>() ?? throw new NullReferenceException();

        await ApplicationDbContextSeed.SeedSampleDataAsync(dbContext);

        // expects a request named "greeting" with a string argument and returns a string
        _connection.On("get-currencies", async () => await _mediator.Send(new GetCurrenciesQuery()));
        _connection.On("get-assets", async () => await _mediator.Send(new GetAssetsQuery()));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // wait for incoming requests
        _connection.Listen();
    }
}