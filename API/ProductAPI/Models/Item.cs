using System;
using System.Collections.Generic;

namespace ProductAPI.Models;

public partial class Item
{
    public int Srnumber { get; set; }

    public int ItemCode { get; set; }

    public string BarCode { get; set; } = null!;

    public string? ItemName { get; set; }

    public decimal? Cost { get; set; }

    public decimal? Price { get; set; }

    public bool? Active { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }
}
