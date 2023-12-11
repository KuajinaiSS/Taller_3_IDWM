using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        [UCNEmail (ErrorMessage = "Email invalido")]
        public string Email { get; set; } = null!;

        [Required]
        [Rut (ErrorMessage = "Rut invalido")]
        public string Rut { get; set; } = null!;

        [Required]
        public int yearBirth { get; set; }

    }
}