using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
//using Newtonsoft.Json;
//using System.Text.Json;
//using System.Text.Json.Serialization;

namespace AddressBook.Models
{
    public class AddressBookItem
    {
        //[JsonIgnore(Condition = JsonIgnoreCondition)]
        public int id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string telephoneNumber { get; set; }
    }
}
