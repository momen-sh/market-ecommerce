using Microsoft.AspNetCore.Mvc;
using market.Dtos;
using market.Services.Interfaces;

namespace market.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-intent")]
        public async Task<IActionResult> CreateIntent([FromBody] CreatePaymentIntentRequestDto dto)
        {
            var result = await _paymentService.CreateIntentAsync(dto);
            return Ok(result);
        }
    }
}
