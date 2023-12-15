using Microsoft.EntityFrameworkCore;
using MobileHub.Models;

namespace MobileHub.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DataContext(DbContextOptions options) : base(options)
        {
        }

    }
}