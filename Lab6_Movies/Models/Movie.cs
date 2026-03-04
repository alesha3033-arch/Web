using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab6_Movies.Models
{
    public class Movie
    {
        public int Id { get; set; }
        
        [StringLength(60, MinimumLength = 3)]
        [Required(ErrorMessage = "Название обязательно")]
        [Display(Name = "Название")]
        public string Title { get; set; } = string.Empty;
        
        [Display(Name = "Дата выпуска")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime ReleaseDate { get; set; }
        
        [Required(ErrorMessage = "Жанр обязателен")]
        [StringLength(30)]
        [Display(Name = "Жанр")]
        public string Genre { get; set; } = string.Empty;
        
        [Range(1, 1000)]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        [Display(Name = "Цена")]
        public decimal Price { get; set; }
        
        [StringLength(10)]
        [Required(ErrorMessage = "Рейтинг обязателен")]
        [Display(Name = "Рейтинг")]
        public string Rating { get; set; } = string.Empty;
    }
}
