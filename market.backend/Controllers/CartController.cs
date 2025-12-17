using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using market.Services.Interfaces;

namespace market.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cart;

        public CartController(ICartService cart)
        {
            _cart = cart;
        }

        private int GetUserId()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.Parse(id!);
        }

        // GET: api/cart
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var cart = await _cart.GetCartAsync(GetUserId());
            return Ok(cart);
        }

        // POST: api/cart
        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCartDto dto)
        {
            await _cart.AddToCartAsync(GetUserId(), dto.ProductId, dto.Quantity);
            return Ok();
        }

        // PATCH: api/cart/5
        [HttpPatch("{productId:int}")]
        public async Task<IActionResult> UpdateQuantity(int productId, UpdateCartQtyDto dto)
        {
            await _cart.UpdateQuantityAsync(GetUserId(), productId, dto.Quantity);
            return Ok();
        }

        // DELETE: api/cart/5
        [HttpDelete("{productId:int}")]
        public async Task<IActionResult> RemoveItem(int productId)
        {
            await _cart.RemoveFromCartAsync(GetUserId(), productId);
            return NoContent();
        }

        // DELETE: api/cart
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            await _cart.ClearCartAsync(GetUserId());
            return NoContent();
        }
    }
}
