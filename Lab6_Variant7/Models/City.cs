using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class City : Place
    {
        [Required]
        [Display(Name = "ID Области")]
        public int RegionId { get; set; }
        
        [Required]
        [Display(Name = "Количество жителей")]
        public int Population { get; set; }
        
        [Required(ErrorMessage = "Мэр обязателен")]
        [StringLength(100)]
        [Display(Name = "Мэр")]
        public string Mayor { get; set; } = string.Empty;
        
        [Display(Name = "Область")]
        public Region? Region { get; set; }
    }
}
