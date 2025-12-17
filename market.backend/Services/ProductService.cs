using market.Dtos;
using market.Models;
using market.Repositories.Interfaces;
using market.Services.Interfaces;

namespace market.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _products;

        public ProductService(IProductRepository products)
        {
            _products = products;
        }

        public Task<List<Product>> GetAllAsync(string? query, string? category)
            => _products.SearchAsync(query, category);

        public Task<Product?> GetByIdAsync(int id)
            => _products.GetByIdAsync(id);

        public async Task<Product> CreateAsync(CreateProductDto dto)
        {
            var p = new Product
            {
                Name = dto.Name.Trim(),
                Price = dto.Price,
                Description = dto.Description,
                ImageUrl = dto.ImageUrl,
                Category = dto.Category,
            };

            await _products.AddAsync(p);
            await _products.SaveChangesAsync();

            return p;
        }

        public async Task<Product> CreateWithImageAsync(CreateProductFormDto dto, string fileName)
        {
            var p = new Product
            {
                Name = dto.Name.Trim(),
                Price = dto.Price,
                Description = dto.Description,
                Category = dto.Category,
                ImageUrl = fileName
            };

            await _products.AddAsync(p);
            await _products.SaveChangesAsync();

            return p;
        }

    }
}
