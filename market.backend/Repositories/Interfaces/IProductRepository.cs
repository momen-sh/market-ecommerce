using market.Models;

namespace market.Repositories.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<List<Product>> SearchAsync(string? query, string? category);
    }
}
