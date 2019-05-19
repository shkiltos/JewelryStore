using jewelryStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.BLL
{
    public class DiscountService
    {
        int discount;
        public DiscountService(int disc)
        {
            this.discount = disc;
        }
        public IEnumerable<Order> GetDiscount(IEnumerable<Order> orders, int i)
        {
            orders.ToList()[i].sumOrder = orders.ToList()[i].sumOrder * discount / 100;
            return orders;
        }
    }
}
