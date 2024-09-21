namespace Yam.Data.DTOs.Auth;

public class SignUpDto
{
    public required string Username { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public required string Password { get; set; }
}
