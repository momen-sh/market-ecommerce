using market.Models;

namespace market.Repositories.Interfaces
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        Task<Payment?> GetByIntentIdAsync(string paymentIntentId);
    }
}
