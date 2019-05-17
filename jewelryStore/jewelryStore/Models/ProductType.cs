using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class ProductType
    {
        public ProductType()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string typeName { get; set; }
        public virtual ICollection<Product> Product { get; set; }
    }
}
