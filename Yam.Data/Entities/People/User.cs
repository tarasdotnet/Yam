namespace Yam.Data.Entities.People;

public class User : BaseEntity
{
    public required string Username { get; set; }

    public required string PasswordHash { get; set; }

    public Person? Person { get; set; }
}
