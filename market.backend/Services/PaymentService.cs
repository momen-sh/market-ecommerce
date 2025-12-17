using Microsoft.EntityFrameworkCore;
using Stripe;
using market.Data;
using market.Dtos;
using market.Models;
using market.Repositories.Interfaces;
using market.Services.Interfaces;

namespace market.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly AppDbContext _db;
        private readonly IPaymentRepository _paymentRepo;

        public PaymentService(AppDbContext db, IPaymentRepository paymentRepo)
        {
            _db = db;
            _paymentRepo = paymentRepo;
        }

        public async Task<CreatePaymentIntentResponseDto> CreateIntentAsync(CreatePaymentIntentRequestDto dto)
        {
            var items = await _db.CartItems
                .Where(c => c.UserId == dto.UserId)
                .Include(c => c.Product)
                .ToListAsync();

            if (items.Count == 0)
                throw new Exception("Cart is empty");

            var total = items.Sum(i => i.Product.Price * i.Quantity);

            var amountInCents = (long)Math.Round(total * 100m, MidpointRounding.AwayFromZero);
            if (amountInCents <= 0)
                throw new Exception("Invalid amount");

            var options = new PaymentIntentCreateOptions
            {
                Amount = amountInCents,
                Currency = dto.Currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                },
                Metadata = new Dictionary<string, string>
                {
                    ["userId"] = dto.UserId.ToString()
                }
            };

            var stripeService = new PaymentIntentService();
            var intent = await stripeService.CreateAsync(options);

            var payment = new Payment
            {
                UserId = dto.UserId,
                Amount = amountInCents,
                Currency = dto.Currency,
                PaymentIntentId = intent.Id,
                ClientSecret = intent.ClientSecret ?? "",
                Status = "Created"
            };

            await _paymentRepo.AddAsync(payment);
            await _paymentRepo.SaveChangesAsync();

            return new CreatePaymentIntentResponseDto
            {
                ClientSecret = payment.ClientSecret,
                PaymentIntentId = payment.PaymentIntentId,
                Amount = payment.Amount,
                Currency = payment.Currency
            };
        }
    }
}
