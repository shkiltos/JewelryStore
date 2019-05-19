using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class Product
    {
        [Required]
        [Key]
        public int Id { get; set; }
        public int typeId { get; set; }
        public string title { get; set; }
        public int price { get; set; }
        public string description { get; set; }
        public string image { get; set; }

        //public virtual OrderLine OrderLine { get; set; }
        public virtual ICollection<OrderLine> OrderLine { get; set; }

        public Product()
        {
            OrderLine = new HashSet<OrderLine>();
        }
    }
}
