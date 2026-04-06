using System.ComponentModel.DataAnnotations;

namespace training.api.Models.DTO
{
    public class AddWalkDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(3, 100)]
        public double LengthInKm { get; set; }

        public string? WalkImgURL { get; set; }
        [Required]
        public Guid DifficultyId { get; set; }

        [Required]
        public Guid RegionId { get; set; }
    }
}
