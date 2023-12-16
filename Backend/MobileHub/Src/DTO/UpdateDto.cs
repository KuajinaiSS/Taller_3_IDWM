using MobileHub.DataAnnotations;

namespace MobileHub.DTO
{
    public class UpdateDto
    {
        public string Username { get; set; } = null!;

        [UCNEmail (ErrorMessage = "Email invalido")]
        public string Email { get; set; } = null!;

        [Rut (ErrorMessage = "Rut invalido")]
        public string Rut { get; set; } = null!;

        [Date (ErrorMessage = "Fecha invalida")]
        public int yearBirth { get; set; }

    }
}