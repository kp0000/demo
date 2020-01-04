using System;
using System.Collections.Generic;

namespace InnoTym.api.Models
{
    public partial class UserDetail
    {
        public UserDetail()
        {
            TransactionDetailRef = new HashSet<TransactionDetail>();
            TransactionDetailUser = new HashSet<TransactionDetail>();
        }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public decimal? Amount { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<TransactionDetail> TransactionDetailRef { get; set; }
        public virtual ICollection<TransactionDetail> TransactionDetailUser { get; set; }
    }
}
