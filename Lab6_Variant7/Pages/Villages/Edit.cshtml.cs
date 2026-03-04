using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages_Villages
{
    public class EditModel : PageModel
    {
        private readonly Lab6_Variant7.Data.PlaceContext _context;

        public EditModel(Lab6_Variant7.Data.PlaceContext context)
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

            var village =  await _context.Villages.FirstOrDefaultAsync(m => m.Id == id);
            if (village == null)
            {
                return NotFound();
            }
            Village = village;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Village).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VillageExists(Village.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool VillageExists(int id)
        {
            return _context.Villages.Any(e => e.Id == id);
        }
    }
}
