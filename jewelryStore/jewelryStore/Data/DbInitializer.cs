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
                new ProductType{typeName = "Кольцо"},
                new ProductType{typeName = "Серьги"},
                new ProductType{typeName = "Браслет"}
            };
            foreach (ProductType pt in productTypes)
            {
                context.ProductType.Add(pt);
            }
            context.SaveChanges();

            var products = new Product[]
            {
                new Product{typeId = 1, title = "Кольцо всевластия", price = 2000, description="Дает власть", image = "images/ring1.jpg"},
                new Product{typeId = 2, title = "Серьги Грация", price = 10000, description="Изящная штука", image ="images/earring1.jpg"},
                new Product{typeId = 3, title = "Браслет с камушками", price = 1000, description="Девчачья безделушка", image="images/bracelet1.jpg" }
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