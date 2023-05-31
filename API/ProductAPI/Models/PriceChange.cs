using System;
using System.Collections.Generic;

namespace ProductAPI.Models;

public partial class PriceChange
{
    public int SrNumber { get; set; }

    public int ItemCode { get; set; }

    public decimal? OldCost { get; set; }

    public string? IncreaseDecrease { get; set; }

    public bool? PriceType { get; set; }

    public string? PriceUpdate { get; set; }

    public decimal? NewCost { get; set; }

    public decimal? OldPrice { get; set; }

    public decimal? NewPrice { get; set; }

    public DateTime? CreatedDate { get; set; }
}
