using Microsoft.EntityFrameworkCore;
using market.Data;
using market.Models;
using market.Services.Interfaces;

namespace market.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _db;

        public CartService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<object> GetCartAsync(int userId)
        {
            var items = await _db.CartItems
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .Select(c => new
                {
                    c.ProductId,
                    c.Quantity,
                    Product = new
                    {
                        c.Product.Id,
                        c.Product.Name,
                        c.Product.Price,
                        c.Product.ImageUrl,
                        c.Product.Category
                    }
                })
                .ToListAsync();

            var total = items.Sum(i => i.Product.Price * i.Quantity);

            return new
            {
                items,
                total
            };
        }

        public async Task AddToCartAsync(int userId, int productId, int quantity)
        {
            if (quantity < 1)
                quantity = 1;

            var productExists = await _db.Products.AnyAsync(p => p.Id == productId);
            if (!productExists)
                throw new InvalidOperationException("Product not found");

            var item = await _db.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (item == null)
            {
                item = new CartItem
                {
                    UserId = userId,
                    ProductId = productId,
                    Quantity = quantity
                };
                _db.CartItems.Add(item);
            }
            else
            {
                item.Quantity += quantity;
            }

            await _db.SaveChangesAsync();
        }

        public async Task UpdateQuantityAsync(int userId, int productId, int quantity)
        {
            if (quantity < 1)
                quantity = 1;

            var item = await _db.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (item == null)
                throw new InvalidOperationException("Cart item not found");

            item.Quantity = quantity;
            await _db.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(int userId, int productId)
        {
            var item = await _db.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (item == null)
                return;

            _db.CartItems.Remove(item);
            await _db.SaveChangesAsync();
        }

        public async Task ClearCartAsync(int userId)
        {
            var items = await _db.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _db.CartItems.RemoveRange(items);
            await _db.SaveChangesAsync();
        }
    }
}
