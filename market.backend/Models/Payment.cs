namespace market.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public long Amount { get; set; }

        public string Currency { get; set; } = "usd";

        public string PaymentIntentId { get; set; } = string.Empty;

        public string ClientSecret { get; set; } = string.Empty;

        // Created / Succeeded / Failed
        public string Status { get; set; } = "Created";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
