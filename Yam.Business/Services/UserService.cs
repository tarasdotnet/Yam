using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OnlineQueue.Services.Helpers;
using System.ComponentModel.DataAnnotations;
using Yam.Business.Authorization;
using Yam.Business.Helpers;
using Yam.Business.Interfaces;
using Yam.Data;
using Yam.Data.DTOs.Auth;
using Yam.Data.DTOs.People;
using Yam.Data.Entities.People;

namespace Yam.Business.Services;

public class UserService(
    AppDbContext context,
    IMapper mapper,
    IJwtUtils jwtUtils) : IUserService
{
    private readonly AppDbContext _context = context;
    private readonly IMapper _mapper = mapper;
    private readonly IJwtUtils _jwtUtils = jwtUtils;

    public async Task<LogInResponseDto> SignUp(SignUpDto signUpDto)
    {
        ArgumentNullException.ThrowIfNull(signUpDto);

        if (!CredsValidationHelper.IsPasswordPolicyCompliant(signUpDto.Password))
        {
            throw new ValidationException(CredsValidationHelper.PASSWORD_POLICY_EXCEPTION_MESSAGE);
        }

        var checkUser = await CheckByUsernameAsync(signUpDto.Username);

        if (checkUser != null)
            throw new ValidationException($"Username '{checkUser.Username}' is not available");

        var user = _mapper.Map<User>(signUpDto);

        await _context.AddAsync(user);
        await _context.SaveChangesAsync();

        var jwtToken = _jwtUtils.GenerateJwtToken(user);

        return new LogInResponseDto(user, jwtToken);
    }

    public async Task<LogInResponseDto> LogIn(LogInDto logInDto)
    {
        var user = await CheckByUsernameAsync(logInDto.Username);

        if (user == null || !HashingHelper.VerifyPassword(logInDto.Password, user.PasswordHash))
            throw new ValidationException("Username or password is incorrect.");

        var jwtToken = _jwtUtils.GenerateJwtToken(user);

        return new LogInResponseDto(user, jwtToken);
    }

    public async Task<UserDto> GetByIdAsync(int id)
    {
        var user = await GetUserByIdAsync(id);

        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> GetUserProfileDataByIdAsync(int id)
    {
        var user = await GetFullUserProfileDataByIdAsync(id);

        return _mapper.Map<UserDto>(user);
    }

    private async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id)
            ?? throw new ApplicationException("User not found.");
    }

    private async Task<User> GetFullUserProfileDataByIdAsync(int id)
    {
        var user = await _context.Users
            .Include(u => u.Person)
            .FirstOrDefaultAsync(u => u.Id == id);

        return user ?? throw new ApplicationException("User not found.");
    }

    private async Task<User?> CheckByUsernameAsync(string username)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
    }
}
