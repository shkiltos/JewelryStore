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
        public virtual DbSet<ProductType> ProductType { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.name).IsRequired();
                entity.Property(e => e.address).IsRequired();
            });
            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.clientId).IsRequired();
                entity.Property(e => e.productId).IsRequired();
                entity.Property(e => e.amount).IsRequired();
                entity.HasOne(d => d.Client)
                .WithMany(p => p.Order)
                .HasForeignKey(d => d.clientId);
                entity.HasOne(d => d.Product)
                .WithMany(p => p.Order)
                .HasForeignKey(d => d.productId);
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.price).IsRequired();
                entity.Property(e => e.title).IsRequired();
                entity.Property(e => e.description).IsRequired();
                entity.Property(e => e.typeId).IsRequired();
                entity.HasOne(d => d.ProductType)
                .WithMany(p => p.Product)
                .HasForeignKey(d => d.typeId);
            });
            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.Property(e => e.typeName).IsRequired();
            });
        }
    }
}
