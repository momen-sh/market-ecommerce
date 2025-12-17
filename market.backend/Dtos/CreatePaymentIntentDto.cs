namespace market.Dtos
{
    public class CreatePaymentIntentRequestDto
    {
        public int UserId { get; set; }
        public string Currency { get; set; } = "usd";
    }

    public class CreatePaymentIntentResponseDto
    {
        public string ClientSecret { get; set; } = string.Empty;
        public string PaymentIntentId { get; set; } = string.Empty;
        public long Amount { get; set; }
        public string Currency { get; set; } = "usd";
    }
}
