using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Region : Place
    {
        [Required]
        [Display(Name = "Количество населенных пунктов")]
        public int SettlementsCount { get; set; }
        
        [Required(ErrorMessage = "Руководство обязательно")]
        [StringLength(100)]
        [Display(Name = "Руководство")]
        public string Leadership { get; set; } = string.Empty;
        
        public ICollection<City> Cities { get; set; } = new List<City>();
    }
}
