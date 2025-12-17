using market.Dtos;
using market.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace market.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IWebHostEnvironment _env;

        public ProductsController(IProductService productService, IWebHostEnvironment env)
        {
            _productService = productService;
            _env = env;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
        {
            var created = await _productService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("with-image")]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> CreateWithImage([FromForm] CreateProductFormDto dto)
        {
            if (dto.Image == null || dto.Image.Length == 0)
                return BadRequest(new { message = "Image is required" });

            var ext = Path.GetExtension(dto.Image.FileName).ToLowerInvariant();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            if (!allowed.Contains(ext))
                return BadRequest(new { message = "Invalid image type" });

            var uploadsDir = Path.Combine(_env.WebRootPath, "uploads", "products");
            Directory.CreateDirectory(uploadsDir);

            var fileName = $"{Guid.NewGuid():N}{ext}";
            var fullPath = Path.Combine(uploadsDir, fileName);

            await using (var stream = System.IO.File.Create(fullPath))
            {
                await dto.Image.CopyToAsync(stream);
            }

            var created = await _productService.CreateWithImageAsync(dto, fileName);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var p = await _productService.GetByIdAsync(id);
            return p is null ? NotFound() : Ok(p);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? query, [FromQuery] string? category)
        {
            var items = await _productService.GetAllAsync(query, category);
            return Ok(items);
        }

    }
}
