using System.Diagnostics.CodeAnalysis;

namespace PChart.Domain;

[SuppressMessage("ReSharper", "AutoPropertyCanBeMadeGetOnly.Local")]
[SuppressMessage("ReSharper", "UnusedMember.Local")]
public class Currency
{
    public Currency(string name, string tickerSymbol)
    {
        Name = name;
        TickerSymbol = tickerSymbol;
    }

#pragma warning disable CS8618
    /// <summary>
    /// For EF Core
    /// </summary>
    private Currency()
#pragma warning restore CS8618
    {
    }

    public int Id { get; private set; }

    public string Name { get; private set; }

    public string PfxSymbol { get; init; } = string.Empty;

    public string SfxSymbol { get; init; } = string.Empty;

    public string DecimalPoint { get; init; } = ".";

    public string GroupSeparator { get; init; } = " ";

    public int Scale { get; init; } = 100;

    public string TickerSymbol { get; private set; }

    public CurrencyType CurrencyType { get; init; } = CurrencyType.Traditional;
}
