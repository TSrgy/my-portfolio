using PChart.Application.Common.Mappings;
using PChart.Domain;

namespace PChart.Application.Assets.Queries.GetAssets;

public class CurrencyDto : IMapFrom<Currency>
{
    public int Id { get; set; }
    public string Name { get; set; }
}