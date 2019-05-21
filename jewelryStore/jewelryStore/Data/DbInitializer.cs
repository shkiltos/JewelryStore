using jewelryStore.Models;
using System.Linq;

namespace jewelryStore.Data
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();
            if (context.Product.Any())
            {
                return;
            }
            
            var products = new Product[]
            {
                new Product{title = "Ring Model RC-M", price = 6000, description="Oxidized sterling silver ring", image = "images/ring1.jpg"},
                new Product{title = "Necklace CROW'S", price = 10000, description="Talisman necklace. Oxidized sterling silver", image ="images/necklace1.jpg"},
                new Product{title = "Rings WRS", price = 13000, description="Couple of wedding rings. Sterling silver", image="images/ring2.jpg" },
                new Product{title = "Ring Model TCW", price = 8000, description="Oxidized sterling silver ring", image = "images/ring3.jpg"},
                new Product{title = "Necklace CROW'S", price = 10000, description="Talisman necklace. Oxidized sterling silver", image ="images/necklace.jpg"},
                new Product{title = "Ring of power", price = 13000, description="Oxidized sterling silver ring", image="images/ring4.jpg" }
            };
            foreach (Product p in products)
            {
                context.Product.Add(p);
            }
            context.SaveChanges();

            var orders = new Order[]
            {
                new Order{userId = "dbasba"}
            };
            foreach (Order or in orders)
            {
                context.Order.Add(or);
            }
            context.SaveChanges();

            var orderLines = new OrderLine[]
            {
                new OrderLine{orderId=1, price=6000, productId=1, quantity = 1},
                new OrderLine{orderId=1, price=10000, productId=2, quantity = 1}
            };
            foreach (OrderLine orl in orderLines)
            {
                context.OrderLine.Add(orl);
            }
            context.SaveChanges();
        }
    }
}