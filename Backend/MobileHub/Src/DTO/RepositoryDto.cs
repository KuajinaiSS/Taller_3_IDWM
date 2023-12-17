namespace MobileHub.DTO
{
    /***
     * Clase para mapear los datos de un repositorio
     */
    public class RepositoryDto
    {
        public string name { get; set; } = null!;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;

        public DateTimeOffset UpdateAt { get; set; } = DateTimeOffset.Now;

        public int CommitsAmount { get; set; }
    }
}