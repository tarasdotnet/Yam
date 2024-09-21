using Yam.Data.Entities.Enums;

namespace Yam.Data.DTOs.People;

public class PersonDto
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public Gender Gender { get; set; } = Gender.NotSpecified;
}
