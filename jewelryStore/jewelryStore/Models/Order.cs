using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class Order
    {
        public Order()
        {
            OrderLine = new HashSet<OrderLine>();
        }

        public int Id { get; set; }
        public int clientId { get; set; }
        public virtual Client Client { get; set; }
        public virtual ICollection<OrderLine> OrderLine { get; set; }
    }
}
