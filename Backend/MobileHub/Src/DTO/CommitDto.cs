namespace MobileHub.Src.DTO
{

    /***
     * Clase para mapear los datos de un commit de un repositorio
     */
    public class CommitDto
    {
        public string Author { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTimeOffset Date { get; set; } = default;

    }
}