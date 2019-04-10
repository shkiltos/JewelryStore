using jewelryStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryController : ControllerBase
    {
        private readonly Context _context;
        public JewelryController(Context context)
        {
            _context = context;
            if (_context.Product.Count() == 0)
            {
                //_context.Product.Add(new Product
                //{
                //    typeId = 1,
                //    title = "Украшение",
                //    price = 100,
                //    description="opis"
                //});
                //_context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            //return _context.Product;
            return _context.Product.Include(p => p.Order);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = await _context.Product.SingleOrDefaultAsync(m => m.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Product.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Product.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            item.typeId = product.typeId;
            item.title = product.title;
            item.price = product.price;
            item.description = product.description;
            _context.Product.Update(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _context.Product.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Product.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
