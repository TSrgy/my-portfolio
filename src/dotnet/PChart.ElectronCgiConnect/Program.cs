using PChart.Application;
using PChart.ElectronCgiConnect;
using PChart.Infrastructure;


var builder = new ConfigurationBuilder()
    .AddCommandLine(args);

var configuration = builder.Build();

void ConfigureServices(IServiceCollection services)
{
    services.AddApplication();
    services.AddInfrastructure(configuration);
    services.AddHostedService<Worker>();
}

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration(x =>
    {
        x.Sources.Clear();
        x.AddConfiguration(configuration);
    })
    .ConfigureLogging(x =>
    {
        x.ClearProviders();
        x.AddConsole();
    })
    .ConfigureServices(ConfigureServices)
    .Build();

await host.RunAsync();


