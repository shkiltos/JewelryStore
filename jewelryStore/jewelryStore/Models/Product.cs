using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class Product
    {
        
        public int Id { get; set; }
        public int typeId { get; set; }
        public string title { get; set; }
        public int price { get; set; }
        public string description { get; set; }
        public string image { get; set; }

        public virtual ProductType ProductType { get; set; }
        //public virtual ICollection<Order> Order { get; set; }
    }
}
