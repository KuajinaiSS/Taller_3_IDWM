namespace MobileHub.Src.DTO
{
    public class CommitDto
    {
        public string Author { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTimeOffset Date { get; set; } = default;

    }
}