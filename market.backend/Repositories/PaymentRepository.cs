using Microsoft.EntityFrameworkCore;
using market.Data;
using market.Models;
using market.Repositories.Interfaces;

namespace market.Repositories
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        private readonly AppDbContext _db;

        public PaymentRepository(AppDbContext db) : base(db)
        {
            _db = db;
        }

        public Task<Payment?> GetByIntentIdAsync(string paymentIntentId)
        {
            return _db.Payments.FirstOrDefaultAsync(p => p.PaymentIntentId == paymentIntentId);
        }
    }
}
