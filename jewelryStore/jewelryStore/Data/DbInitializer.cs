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
            

            var productTypes = new ProductType[]
            {
                new ProductType{typeName = "Ring"},
                new ProductType{typeName = "Necklace"},
                new ProductType{typeName = "Bracelet"}
            };
            foreach (ProductType pt in productTypes)
            {
                context.ProductType.Add(pt);
            }
            context.SaveChanges();

            var products = new Product[]
            {
                new Product{typeId = 1, title = "Ring Model RC-M", price = 6000, description="Oxidized sterling silver ring", image = "images/ring1.jpg"},
                new Product{typeId = 2, title = "Necklace CROW'S PAW", price = 10000, description="Talisman necklace. Oxidized sterling silver", image ="images/necklace1.jpg"},
                new Product{typeId = 1, title = "Rings WRS", price = 13000, description="Couple of wedding rings. Sterling silver", image="images/ring2.jpg" }
            };
            foreach (Product p in products)
            {
                context.Product.Add(p);
            }
            context.SaveChanges();

            var clients = new Client[]
            {
                new Client{name="Гадалов Александр",address = "Иваново"},
                new Client{name="Булатов Николай",address = "Булатово"}
            };
            foreach (Client cl in clients)
            {
                context.Client.Add(cl);
            }
            context.SaveChanges();

            var orders = new Order[]
            {
                new Order{clientId = 1,productId=1, amount = 1},
                new Order{clientId = 2,productId=3, amount = 2}
            };
            foreach (Order or in orders)
            {
                context.Order.Add(or);
            }
            context.SaveChanges();
        }
    }
}