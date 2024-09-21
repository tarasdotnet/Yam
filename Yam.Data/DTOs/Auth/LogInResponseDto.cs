using Yam.Data.Entities.People;

namespace Yam.Data.DTOs.Auth;

public class LogInResponseDto(User user, string token)
{
    public int Id { get; set; } = user.Id;

    public string Username { get; set; } = user.Username;

    public string Token { get; set; } = token;
}
