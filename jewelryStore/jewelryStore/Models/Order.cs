using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int productId { get; set; }
        public int clientId { get; set; }
        public int amount { get; set; }
        public virtual Client Client { get; set; }
        public virtual Product Product { get; set; }
    }
}
