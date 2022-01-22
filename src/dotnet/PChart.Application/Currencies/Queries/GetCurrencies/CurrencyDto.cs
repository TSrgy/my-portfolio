using AutoMapper;
using PChart.Domain;
using PChart.Application.Common.Mappings;

namespace PChart.Application.Currencies.Queries.GetCurrencies;

public class CurrencyDto : IMapFrom<Currency>
{
    public int Id { get; set; }
    public string Name { get; set; }
}