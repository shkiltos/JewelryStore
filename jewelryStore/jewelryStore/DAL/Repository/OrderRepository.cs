using jewelryStore.DAL.Interfaces;
using jewelryStore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jewelryStore.DAL.Repository
{
    public class OrderRepository : IRepository<Order>, IDisposable
    {
        private Context context;

        public OrderRepository(Context context)
        {
            this.context = context;
        }


        public void Create(Order item)
        {
            throw new NotImplementedException();
        }
        private bool disposed = false;
        public void Delete(int id)
        {
            Order order = context.Order.Find(id);
            context.Order.Remove(order);
        }

        public void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public bool Exists(int id)
        {
            return context.Order.Any(e => e.Id == id);
        }

        public IEnumerable<Order> GetAll()
        {
            return context.Order.Include(o => o.OrderLine).ToList();
        }

        public Order GetByID(int id)
        {
            return context.Order.Find(id);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Update(Order item)
        {
            context.Entry(item).State = EntityState.Modified;
        }
    }
}
