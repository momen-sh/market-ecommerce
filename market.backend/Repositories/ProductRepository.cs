using Microsoft.EntityFrameworkCore;
using market.Data;
using market.Models;
using market.Repositories.Interfaces;

namespace market.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext db) : base(db) { }

        public async Task<List<Product>> SearchAsync(string? query, string? category)
        {
            var q = _db.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
                q = q.Where(p => p.Name.Contains(query));

            if (!string.IsNullOrWhiteSpace(category))
                q = q.Where(p => p.Category == category);

            return await q.ToListAsync();
        }
    }
}
