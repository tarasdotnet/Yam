using AutoMapper;
using Yam.Business.Helpers;
using Yam.Data.DTOs.Auth;
using Yam.Data.DTOs.People;
using Yam.Data.Entities.People;

namespace Yam.Business;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<SignUpDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => HashingHelper.HashPassword(src.Password)))
            .ForMember(dest => dest.Person, opt => opt.MapFrom(src => new Person
            {
                FirstName = src.FirstName,
                LastName = src.LastName,
                Email = src.Email,
            }));

        CreateMap<User, UserDto>();

        CreateMap<Person, PersonDto>();
    }
}
