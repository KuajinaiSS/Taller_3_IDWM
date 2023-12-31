using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.DTO
{
    /***
     * Clase para mapear los datos de un usuario que se registra en la aplicacion
     */
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [UCNEmail (ErrorMessage = "Email invalido")]
        public string Email { get; set; } = null!;

        [Required]
        [Rut (ErrorMessage = "Rut invalido")]
        public string Rut { get; set; } = null!;

        [Required]
        [Date (ErrorMessage = "Fecha invalida")]
        public int yearBirth { get; set; }

    }
}