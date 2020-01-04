using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InnoTym.api.Models
{
    public class customTransaction
    {
        public int TransactionId { get; set; }
        public int? UserId { get; set; }
        public int? RefId { get; set; }
        public string TransactionType { get; set; }
        public decimal? TransactionAmount { get; set; }
        public decimal? InitialAmount { get; set; }
        public DateTime? Date { get; set; }

        public string Type { get; set; }
        public string RefUserName { get; set; }
    }
}
