using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jewelryStore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace jewelryStore.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrderLineController : ControllerBase
    {
        private readonly Context _context;
        public OrderLineController(Context context)
        {
            _context = context;

        }

        [HttpGet]
        public IEnumerable<OrderLine> GetAll()
        {//получение всех строк заказа
            try { return _context.OrderLine; }
            catch (Exception ex)
            {
                Log.Write(ex);
                return null;
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderLine([FromRoute] int id)
        {//получение конкретной строки заказа по id
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.WriteSuccess("OrderLineController.GetOrderLine", "Валидация внутри контроллера неудачна.");
                    return BadRequest(ModelState);
                }

                var item = await _context.OrderLine.SingleOrDefaultAsync(m => m.Id == id);

                if (item == null)
                {
                    Log.WriteSuccess("OrderLineController.GetOrderLine", "Элемент OrderLine не найден.");
                    return NotFound();
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                Log.Write(ex);
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> Create([FromBody] OrderLine item)
        {//создание новой строки заказа
         //  string id = IDEvent().Result;//получили id пользователя
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.WriteSuccess("OrderLineController.Create", "Валидация внутри контроллера неудачна.");
                    return BadRequest(ModelState);
                }

                _context.OrderLine.Add(item);
                await _context.SaveChangesAsync();
                Log.WriteSuccess("OrderLineController.Create", "Добавлена новая строка заказа.");
                return CreatedAtAction("GetOrderLine", new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                Log.Write(ex);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {//удаление существующей строки заказа
            try
            {
                if (!ModelState.IsValid)
                {
                    Log.WriteSuccess("OrderLineController.Delete", "Валидация внутри контроллера неудачна.");
                    return BadRequest(ModelState);
                }
                var item = _context.OrderLine.Find(id);
                if (item == null)
                {
                    Log.WriteSuccess("OrderLineController.Delete", "Элемент не найден.");
                    return NotFound();
                }
                _context.OrderLine.Remove(item);
                await _context.SaveChangesAsync();
                Log.WriteSuccess("OrderLineController.Delete", "Элемент удален.");
                return NoContent();
            }
            catch (Exception ex)
            {
                Log.Write(ex);
                return BadRequest(ModelState);
            }
        }
    }
}