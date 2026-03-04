using System.ComponentModel.DataAnnotations;

namespace Lab6_Variant7.Models
{
    public class Village : Place
    {
        [Required(ErrorMessage = "Район обязателен")]
        [StringLength(100)]
        [Display(Name = "Район")]
        public string District { get; set; } = string.Empty;
    }
}
