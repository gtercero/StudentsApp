//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace StudentsApp.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class StudentInformation
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Zip { get; set; }

        public IEnumerable<StudentsHobbies> Hobbies { get; set; }
        public List<string> HobbieName { get; set; }
    }
}
