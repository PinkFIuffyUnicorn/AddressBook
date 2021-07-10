using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.Models
{
    public class AddressBookContext : DbContext
    {
        public AddressBookContext(DbContextOptions<AddressBookContext> options) : base(options) { }

        public DbSet<AddressBookItem> AddressBook { get; set; }
    }
}
