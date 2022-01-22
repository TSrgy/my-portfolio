using PChart.Application.Common.Interfaces;

namespace PChart.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.UtcNow;
}