using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages_Villages
{
    public class DeleteModel : PageModel
    {
        private readonly Lab6_Variant7.Data.PlaceContext _context;

        public DeleteModel(Lab6_Variant7.Data.PlaceContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Village Village { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var village = await _context.Villages.FirstOrDefaultAsync(m => m.Id == id);

            if (village is not null)
            {
                Village = village;

                return Page();
            }

            return NotFound();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var village = await _context.Villages.FindAsync(id);
            if (village != null)
            {
                Village = village;
                _context.Villages.Remove(Village);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
