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
    
    public partial class Wishlist
    {
        public int WId { get; set; }
        public Nullable<int> UId { get; set; }
        public Nullable<int> BookId { get; set; }
    
        public virtual Book Book { get; set; }
        public virtual UserInfo UserInfo { get; set; }
    }
}
