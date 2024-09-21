namespace Yam.Data.DTOs.People;

public class UserDto
{
    public int Id { get; set; }

    public required string Username { get; set; }

    public PersonDto? Person { get; set; }
}
