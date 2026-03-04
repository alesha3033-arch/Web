using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages_Regions
{
    public class DetailsModel : PageModel
    {
        private readonly Lab6_Variant7.Data.PlaceContext _context;

        public DetailsModel(Lab6_Variant7.Data.PlaceContext context)
        {
            _context = context;
        }

        public Region Region { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var region = await _context.Regions.FirstOrDefaultAsync(m => m.Id == id);

            if (region is not null)
            {
                Region = region;

                return Page();
            }

            return NotFound();
        }
    }
}
