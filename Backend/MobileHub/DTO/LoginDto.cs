using System.ComponentModel.DataAnnotations;

namespace MobileHub.DTO
{
    public class LoginDto
    {
        [Required (ErrorMessage = "El campo Usuario es obligatorio para iniciar sesión")]
        public string Email { get; set; } = string.Empty;

        [Required (ErrorMessage = "El campo Contraseña es obligatorio para iniciar sesión")]
        public string Rut { get; set; } = string.Empty;
        
    }
}