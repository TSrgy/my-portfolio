using System.Threading.Tasks;
using FluentAssertions;
using PChart.Application.Currencies.Queries.GetCurrencies;
using PChart.Domain;
using Xunit;

namespace PChart.Application.IntegrationTests.Currencies.Queries;

[Collection("Database collection")]
public class GetCurrenciesQueryTests : TestBase
{
    public GetCurrenciesQueryTests(DatabaseFixture fixture)
        : base(fixture)
    {
    }

    [Fact]
    public async Task ShouldReturnAllCurrencies()
    {
        var currencies = new Currency[]
        {
            new("Test1", "tst1"),
            new("Test2", "tst2")
        };

        foreach (var currency in currencies)
        {
            await Fixture.AddAsync(currency);
        }

        var result = await Fixture.SendAsync(new GetCurrenciesQuery());

        result.Currencies.Should().HaveSameCount(currencies);
    }
}