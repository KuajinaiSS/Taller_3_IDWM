using System.ComponentModel.DataAnnotations;

namespace MobileHub.DTO
{
    /***
     * Clase para mapear los datos de un usuario que se logea en la aplicacion
     */
    public class LoginDto
    {
        [Required (ErrorMessage = "El campo Usuario es obligatorio para iniciar sesión")]
        public string Email { get; set; } = string.Empty;

        [Required (ErrorMessage = "El campo Contraseña es obligatorio para iniciar sesión")]
        public string Password { get; set; } = string.Empty;
        
    }
}