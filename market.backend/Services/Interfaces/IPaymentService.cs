using market.Dtos;

namespace market.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<CreatePaymentIntentResponseDto> CreateIntentAsync(CreatePaymentIntentRequestDto dto);
    }
}
