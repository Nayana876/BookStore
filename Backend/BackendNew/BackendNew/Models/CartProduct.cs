//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BackendNew.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CartProduct
    {
        public int CPId { get; set; }
        public int CartId { get; set; }
        public int BookId { get; set; }
        public Nullable<int> Quantity { get; set; }
    
        public virtual Book Book { get; set; }
        public virtual Cart Cart { get; set; }
    }
}
