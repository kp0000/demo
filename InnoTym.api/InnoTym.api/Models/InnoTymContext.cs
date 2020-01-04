using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace InnoTym.api.Models
{
    public partial class InnoTymContext : DbContext
    {
        public InnoTymContext()
        {
        }

        public InnoTymContext(DbContextOptions<InnoTymContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TransactionDetail> TransactionDetail { get; set; }
        public virtual DbSet<UserDetail> UserDetail { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=USER\\KRISHNA;Initial Catalog=InnoTym;Integrated Security=SSPI;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<TransactionDetail>(entity =>
            {
                entity.HasKey(e => e.TransactionId)
                    .HasName("PK__Transact__55433A6BACA8F258");

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.InitialAmount).HasColumnType("money");

                entity.Property(e => e.TransactionAmount).HasColumnType("money");

                entity.Property(e => e.TransactionType).HasMaxLength(150);

                entity.HasOne(d => d.Ref)
                    .WithMany(p => p.TransactionDetailRef)
                    .HasForeignKey(d => d.RefId)
                    .HasConstraintName("Transaction_RefId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TransactionDetailUser)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("Transaction_UserId");
            });

            modelBuilder.Entity<UserDetail>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__userDeta__CB9A1CDFD7094D06");

                entity.ToTable("userDetail");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.Name).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(250);
            });
        }
    }
}
