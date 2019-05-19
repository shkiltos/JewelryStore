using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        [Required]
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("User")]
        public string userId { get; set; }
        public int active { get; set; }
        public DateTime dateOrder { get; set; }
        public int sumOrder { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<OrderLine> OrderLine { get; set; }
    }
}
