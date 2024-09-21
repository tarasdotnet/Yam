using System.Net.Mail;

namespace OnlineQueue.Services.Helpers;
public static class CredsValidationHelper
{
    public const string PASSWORD_POLICY_EXCEPTION_MESSAGE = "Password must be at least 8 characters long, contain upper case and special symbol.";

    private const int _minLength = 8;

    public static bool IsEmailValid(string email) => MailAddress.TryCreate(email, out _);

    public static bool IsPasswordPolicyCompliant(string password)
    {
        if (password.Length < _minLength
            || !password.Any(char.IsUpper)
            || !password.Any(char.IsDigit)
            || password.Contains(" ")
            || !password.Any(char.IsSymbol) && !password.Any(char.IsPunctuation))
        {
            return false;
        }

        return true;
    }
}
