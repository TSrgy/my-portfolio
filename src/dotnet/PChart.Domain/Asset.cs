namespace PChart.Domain;

public class Asset
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Currency Currency { get; set; }
    public decimal Price { get; set; }
    public uint Amount { get; set; }
}