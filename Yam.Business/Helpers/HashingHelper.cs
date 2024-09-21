using BC = BCrypt.Net.BCrypt;

namespace Yam.Business.Helpers;

public static class HashingHelper
{
    const int WORK_FACTOR = 13;

    public static string HashPassword(string password)
    {
        return BC.EnhancedHashPassword(password, WORK_FACTOR);
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BC.EnhancedVerify(password, hashedPassword);
    }
}
