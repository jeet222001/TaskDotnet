using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProductAPI.Models;

public partial class ProductContext : DbContext
{
    public ProductContext()
    {
    }

    public ProductContext(DbContextOptions<ProductContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<PriceChange> PriceChanges { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Srnumber);

            entity.HasIndex(e => e.Srnumber, "IX_Items").IsUnique();

            entity.Property(e => e.Srnumber).HasColumnName("SRNumber");
            entity.Property(e => e.BarCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cost).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ItemName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<PriceChange>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("PriceChange");

            entity.HasIndex(e => e.SrNumber, "IX_PriveChange").IsUnique();

            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.IncreaseDecrease)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Increase_Decrease");
            entity.Property(e => e.NewCost).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.NewPrice).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.OldCost).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.OldPrice).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.PriceUpdate)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
