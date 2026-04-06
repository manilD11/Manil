using AutoMapper;
using training.api.Models.Domain;
using training.api.Models.DTO;

namespace training.api.Mappings
{
    public class MappingProfile:Profile
    {

        public MappingProfile()
        {
            CreateMap<Region, RegionDTO>().ReverseMap();
            CreateMap<AddRegion, Region>().ReverseMap();
            CreateMap<UpdateRegion, Region>().ReverseMap();


            CreateMap<AddWalkDTO, Walk>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<Walk, WalkDTO>().ReverseMap();


            CreateMap<Difficulty,DiffDTO>().ReverseMap();
            CreateMap<UpdateWalkDTO, Walk>().ReverseMap();
        }
    }
}

