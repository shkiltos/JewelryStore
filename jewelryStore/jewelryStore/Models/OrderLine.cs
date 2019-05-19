using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class OrderLine
    {
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Order")]
        public int orderId { get; set; }
        [Required]
        [ForeignKey("Product")]
        public int productId { get; set; }

        public int quantity { get; set; }
        public int price { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
