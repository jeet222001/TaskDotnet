using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Models;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceChangeController : ControllerBase
    {

        private readonly ProductContext _context;

        public PriceChangeController(ProductContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddPriceChange(PriceChange priceChange)
        {
            // Perform price change logic and update Item table accordingly

            _context.PriceChanges.Add(priceChange);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult GetPriceChanges()
        {
            var priceChanges = _context.PriceChanges.ToList();
            return Ok(priceChanges);
        }
    }
}
