using Yam.Data.DTOs.Auth;
using Yam.Data.DTOs.People;

namespace Yam.Business.Interfaces;

public interface IUserService
{
    /// <param name="signUpDto"></param>
    /// <returns>Returns auth response DTO containing JWT.</returns>
    Task<LogInResponseDto> SignUp(SignUpDto signUpDto);

    /// <param name="logInDto"></param>
    /// <returns>Returns auth response DTO containing JWT.</returns>
    Task<LogInResponseDto> LogIn(LogInDto logInDto);

    /// <summary>
    /// Gets single user entity info.
    /// </summary>
    /// <param name="id"></param>
    Task<UserDto> GetByIdAsync(int id);

    /// <summary>
    /// Gets full user profile data.
    /// </summary>
    /// <param name="id"></param>
    Task<UserDto> GetUserProfileDataByIdAsync(int id);
}
