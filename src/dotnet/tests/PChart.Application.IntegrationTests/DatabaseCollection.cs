using Xunit;

namespace PChart.Application.IntegrationTests;

[CollectionDefinition("Database collection")]
public partial class DatabaseCollection : ICollectionFixture<DatabaseFixture>
{
    
}