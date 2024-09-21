using Yam.Business.Interfaces;
using Yam.Business.Services;

namespace Yam.API.Extensions;

public static class DIExtensions
{
    public static void AddBusinessServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IUserService, UserService>();
    }
}
