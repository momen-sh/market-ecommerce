using Microsoft.AspNetCore.Http;

namespace market.Dtos
{
    public class CreateProductFormDto
    {
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";

        public IFormFile Image { get; set; } = default!;
    }
}
