using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Place
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Название обязательно")]
        [StringLength(100)]
        [Display(Name = "Название")]
        public string Name { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "Площадь обязательна")]
        [Range(0.01, 1000000)]
        [Display(Name = "Площадь (км²)")]
        public double Area { get; set; }
    }
}
