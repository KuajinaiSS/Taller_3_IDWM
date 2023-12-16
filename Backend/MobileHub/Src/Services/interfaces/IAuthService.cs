using MobileHub.DTO;

namespace MobileHub.Src.Services.interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDto> Login(LoginDto loginDto);

        
    }
}