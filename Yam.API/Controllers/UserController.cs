using Microsoft.AspNetCore.Mvc;
using Yam.Business.Authorization;
using Yam.Business.Interfaces;
using Yam.Data.DTOs.Auth;

namespace Yam.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    private readonly IUserService _userService = userService;

    [HttpPost]
    [Route("signUp")]
    [AllowAnonymous]
    public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDTO)
    {
        var response = await _userService.SignUp(signUpDTO);
        return Ok(response);
    }

    [HttpPost]
    [AllowAnonymous]
    [Route("logIn")]
    public async Task<IActionResult> LogIn([FromBody] LogInDto logInDto)
    {
        var response = await _userService.LogIn(logInDto);
        return Ok(response);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(int id)
    {
        var response = await _userService.GetByIdAsync(id);
        return Ok(response);
    }

    [Authorize]
    [HttpGet("profile/{id}")]
    public async Task<IActionResult> GetUserProfileDataByIdAsync(int id)
    {
        var response = await _userService.GetUserProfileDataByIdAsync(id);
        return Ok(response);
    }
}
