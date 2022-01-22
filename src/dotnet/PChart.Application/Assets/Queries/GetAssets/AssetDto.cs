using AutoMapper;
using PChart.Application.Common.Mappings;
using PChart.Domain;

namespace PChart.Application.Assets.Queries.GetAssets;

public class AssetDto : IMapFrom<Asset>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public CurrencyDto Currency { get; set; }

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Asset, AssetDto>()
            .ForMember(d => d.Currency, opt => opt.MapFrom(s => s.Currency));
    }
}