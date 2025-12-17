using market.Models;

namespace market.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            if (db.Products.Any())
                return;

            db.Products.AddRange(
                new Product
                {
                    Name = "Laptop",
                    Price = 1200,
                    Category = "Electronics",
                    Description = "High performance laptop",
                    ImageUrl = "/images/laptop.webp"
                },
                new Product
                {
                    Name = "Phone",
                    Price = 800,
                    Category = "Electronics",
                    Description = "Smart phone",
                    ImageUrl = "/images/phone.webp"
                },
                new Product
                {
                    Name = "Headphones",
                    Price = 150,
                    Category = "Accessories",
                    Description = "Noise cancelling headphones",
                    ImageUrl = "/images/headphones.webp"
                }
            );

            db.SaveChanges();
        }
    }
}
