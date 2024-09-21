using Microsoft.EntityFrameworkCore;
using Yam.Data.Entities.People;

namespace Yam.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Person> Persons { get; set; }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasOne(person => person.User)
                  .WithOne(user => user.Person)
                  .HasForeignKey<User>(user => user.Id);
        });
    }
}
