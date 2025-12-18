using System.ComponentModel.DataAnnotations;

namespace market.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(0.01, 100000)]
        public decimal Price { get; set; }

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
