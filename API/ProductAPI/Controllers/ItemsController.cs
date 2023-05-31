using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Models;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {

        private readonly ProductContext _context;

        public ItemsController(ProductContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult AddItem(Item item)
        {
            // Perform duplicate validation for Itemname and Barcode

            _context.Items.Add(item);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult GetItems()
        {
            var items = _context.Items.ToList();
            return Ok(items);
        }
    }
}
