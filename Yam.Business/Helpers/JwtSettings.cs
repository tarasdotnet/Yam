namespace Yam.Business.Helpers;

public class JwtSettings
{
    /// <summary>
    /// Secret key.
    /// </summary>
    public string Key { get; set; } = string.Empty;

    /// <summary>
    /// Issuer of the JWT.
    /// </summary>
    public string Issuer { get; set; } = string.Empty;

    /// <summary>
    /// Recipients that the JWT is intended for.
    /// </summary>
    public string Audience { get; set; } = string.Empty;

    /// <summary>
    /// Token time to live in days.
    /// </summary>
    public int TTL { get; set; }
}
