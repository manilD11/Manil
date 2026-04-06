using System.ComponentModel.DataAnnotations;

namespace training.api.Models.DTO
{
    public class UpdateRegion
    {
        [Required]
        [MinLength(2, ErrorMessage = "Code should be Min 2")]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
        public string? RegionImgURL { get; set; }
    }
}
