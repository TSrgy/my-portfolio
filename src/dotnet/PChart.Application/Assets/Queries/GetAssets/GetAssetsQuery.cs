using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PChart.Application.Common.Interfaces;

namespace PChart.Application.Assets.Queries.GetAssets;

public class GetAssetsQuery : IRequest<AssetsVm>
{
    
}

public class GetCurrenciesQueryHandler : IRequestHandler<GetAssetsQuery, AssetsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetCurrenciesQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AssetsVm> Handle(GetAssetsQuery request, CancellationToken cancellationToken)
    {
        return new AssetsVm
        {
            Assets = await _context.Assets
                .AsNoTracking()
                .ProjectTo<AssetDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToListAsync(cancellationToken)
        };
    }
}