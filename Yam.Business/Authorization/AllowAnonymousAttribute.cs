namespace Yam.Business.Authorization;

/// <summary>
/// Custom AllowAnonymous attribute to avoid namespace ambiguity
/// </summary>
[AttributeUsage(AttributeTargets.Method)]
public class AllowAnonymousAttribute : Attribute
{ }
