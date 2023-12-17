namespace MobileHub.DTO
{
    /***
     * Clase para mapear los datos que se envian al logear un usuario en la aplicacion
     */
    public class LoginResponseDto
    {
        public string Token { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}