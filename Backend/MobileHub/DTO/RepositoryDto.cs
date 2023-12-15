namespace MobileHub.DTO
{
    public class RepositoryDto
    {
        public string Name { get; set; } = null!;

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;

        public DateTimeOffset UpdateAt { get; set; } = DateTimeOffset.Now;

        public int CommitsAmount { get; set; }
    }
}