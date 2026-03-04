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
    public class IndexModel : PageModel
    {
        private readonly Lab6_Variant7.Data.PlaceContext _context;

        public IndexModel(Lab6_Variant7.Data.PlaceContext context)
        {
            _context = context;
        }

        public IList<Region> Region { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Region = await _context.Regions.ToListAsync();
        }
    }
}
