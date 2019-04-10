using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class Client
    {
        public Client()
        {
            Order = new HashSet<Order>();
        }
        public int Id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        
        public virtual ICollection<Order> Order { get; set; }
    }
}
