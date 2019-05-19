using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.Models
{
    public class User : IdentityUser
    {
        public string Fio { get; set; }
        public string Address { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public User()
        {
            Order = new HashSet<Order>();
        }
    }
}
