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
    
    public partial class Testimonial
    {
        public int TestimonialId { get; set; }
        public string Name { get; set; }
        public string Review { get; set; }
        public Nullable<System.DateTime> SubmittedAt { get; set; }
    }
}
