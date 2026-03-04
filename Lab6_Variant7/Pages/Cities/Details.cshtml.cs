using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Lab6_Variant7.Data;
using Lab6_Variant7.Models;

namespace Lab6_Variant7.Pages_Cities
{
    public class DetailsModel : PageModel
    {
        private readonly Lab6_Variant7.Data.PlaceContext _context;

        public DetailsModel(Lab6_Variant7.Data.PlaceContext context)
        {
            _context = context;
        }

        public City City { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var city = await _context.Cities.FirstOrDefaultAsync(m => m.Id == id);

            if (city is not null)
            {
                City = city;

                return Page();
            }

            return NotFound();
        }
    }
}
