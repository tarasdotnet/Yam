using Yam.Data.Entities.Enums;

namespace Yam.Data.Entities.People;

public class Person : BaseEntity
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public Gender Gender { get; set; } = Gender.NotSpecified;

    public User? User { get; set; }
}
