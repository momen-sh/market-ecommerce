using market.Dtos;
using market.Models;

namespace market.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAllAsync(string? query, string? category);
        Task<Product?> GetByIdAsync(int id);
        Task<Product> CreateAsync(CreateProductDto dto);
        Task<Product> CreateWithImageAsync(CreateProductFormDto dto, string fileName);
    }
}
