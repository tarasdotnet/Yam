using System.Net;

namespace Yam.API.Middleware;

public class ExceptionHandlerMiddleware(RequestDelegate requestDelegate)
{
    private const string DEFAULT_RESPONSE_MESSAGE = "Internal server error";
    private const HttpStatusCode DEFAULT_HTTP_STATUS_CODE = HttpStatusCode.InternalServerError;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await requestDelegate(context);
        }
        catch (ApplicationException ex)
        {
            await HandleExceptionAsync(
                context,
                HttpStatusCode.BadRequest,
                responseMessage: GetFullExceptionMessage(ex));
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(
                context,
                responseMessage: GetFullExceptionMessage(ex));
        }
    }

    private static async Task HandleExceptionAsync(
        HttpContext context,
        HttpStatusCode httpStatusCode = DEFAULT_HTTP_STATUS_CODE,
        string responseMessage = DEFAULT_RESPONSE_MESSAGE)
    {
        context.Response.ContentType = "text/plain";
        context.Response.StatusCode = (int)httpStatusCode;

        await context.Response.WriteAsync(responseMessage);
    }

    private static string GetFullExceptionMessage(Exception ex)
    {
        if (string.IsNullOrWhiteSpace(ex.Message))
        {
            return DEFAULT_RESPONSE_MESSAGE;
        }

        return string.Join('\n', ex.Message, ex.InnerException?.Message ?? "");
    }
}
