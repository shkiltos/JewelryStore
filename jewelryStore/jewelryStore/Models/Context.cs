using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace jewelryStore.Models
{
    public partial class Context : IdentityDbContext<User>
    {
        #region Constructor
        public Context(DbContextOptions<Context> options) : base(options)
        { }
        #endregion
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderLine> OrderLine { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.User).WithMany(p => p.Order).HasForeignKey(d => d.userId);
                entity.HasMany(a => a.OrderLine).WithOne(a => a.Order).HasForeignKey(a => a.orderId);
            });
            modelBuilder.Entity<OrderLine>(entity =>
            {
                entity.Property(e => e.price).IsRequired();
                entity.Property(e => e.productId).IsRequired();
                entity.Property(e => e.orderId).IsRequired();
                entity.Property(e => e.quantity).IsRequired();
                entity.HasOne(d => d.Order).WithMany(p => p.OrderLine).HasForeignKey(d => d.orderId);
                entity.HasOne(d => d.Product).WithMany(a => a.OrderLine).HasForeignKey(d => d.productId);

            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.price).IsRequired();
                entity.Property(e => e.title).IsRequired();
                entity.Property(e => e.description).IsRequired();
                entity.Property(e => e.typeId).IsRequired();
                //entity.HasMany(d => d.ProductType).WithOne(p => p.Product).HasForeignKey(d => d.typeId);
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasMany(a => a.Order).WithOne(b => b.User).HasForeignKey(c => c.userId);
            });
        }
    }
}
