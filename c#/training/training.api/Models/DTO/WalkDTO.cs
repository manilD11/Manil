using training.api.Models.Domain;

namespace training.api.Models.DTO
{
    public class WalkDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double LengthInKm { get; set; }
        public string? WalkImgURL { get; set; }


        public RegionDTO Region { get; set; }
        public DiffDTO Difficulty { get; set; }
        


    }
}
