using Yam.Data.Entities.People;

namespace Yam.Business.Authorization;

public interface IJwtUtils
{
    /// <summary>
    /// Generates JWT for the user.
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public string GenerateJwtToken(User user);

    /// <summary>
    /// Returns user id from JWT token if validation successful, otherwise null.
    /// </summary>
    /// <param name="token"></param>
    public int? ValidateJwtToken(string token);
}
