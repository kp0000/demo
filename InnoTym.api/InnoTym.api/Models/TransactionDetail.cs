using System;
using System.Collections.Generic;

namespace InnoTym.api.Models
{
    public partial class TransactionDetail
    {
        public int TransactionId { get; set; }
        public int? UserId { get; set; }
        public int? RefId { get; set; }
        public string TransactionType { get; set; }
        public decimal? TransactionAmount { get; set; }
        public decimal? InitialAmount { get; set; }
        public DateTime? Date { get; set; }

        public virtual UserDetail Ref { get; set; }
        public virtual UserDetail User { get; set; }
    }
}
