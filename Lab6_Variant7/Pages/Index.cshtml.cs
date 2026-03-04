using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages;

public class IndexModel : PageModel
{
    private readonly PlaceContext _context;

    public IndexModel(PlaceContext context)
    {
        _context = context;
    }

    [BindProperty(SupportsGet = true)]
    public string? SearchString { get; set; }

    public IList<Place> SearchResults { get; set; } = new List<Place>();

    public async Task OnGetAsync()
    {
        if (!string.IsNullOrEmpty(SearchString))
        {
            SearchResults = await _context.Places
                .Include(p => (p as City).Region)
                .Where(p => p.Name.Contains(SearchString))
                .ToListAsync();
        }
    }
}
