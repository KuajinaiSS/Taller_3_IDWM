namespace MobileHub.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Rut { get; set; } = string.Empty;

        public int yearBirth { get; set; }
    }
}