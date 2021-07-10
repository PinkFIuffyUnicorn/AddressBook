using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AddressBook.Models;

namespace AddressBook.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AddressBook : ControllerBase
    {
        private readonly AddressBookContext _context;

        public AddressBook(AddressBookContext context)
        {
            _context = context;
        }

        // GET: /AddressBook?param1=value1&param2=value2...
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressBookItem>>> GetAddressBooks(int id, string firstName, string lastName, string address, string telephoneNumber)
        {
            //var addressBook = _context.AddressBook.Where(ab => firstName.Contains("A")).ToList();
            var addressBook = _context.AddressBook
                .Where(ab => id == 0 || id == ab.id) // Query by id parameter
                .Where(ab => firstName == null || ab.firstName.Contains(firstName)) // Query by firstName parameter
                .Where(ab => lastName == null || ab.lastName.Contains(lastName)) // Query by lastName parameter
                .Where(ab => address == null || ab.address.Contains(address)) // Query by address parameter
                .Where(ab => telephoneNumber == null || ab.telephoneNumber.Contains(telephoneNumber)) // Query by telephoneNumber parameter
                .ToList();

            return addressBook;
        }

        // GET: AddressBook/4
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressBookItem>> GetAddressBookById(int id)
        {
            var addressBook = await _context.AddressBook.FindAsync(id); // Find record via ID

            if (addressBook == null)
            {
                return NotFound();
            }

            return addressBook;
        }

        // PUT: AddressBook/4
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddressBook(int id, AddressBookItem addressBook)
        {
            if (TelephoneNumberExists(addressBook.telephoneNumber))
            {
                return Conflict();
            }

            addressBook.id = id; // Set the models id to the id from the parameter

            _context.Entry(addressBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: AddressBook
        [HttpPost]
        public async Task<ActionResult<AddressBookItem>> PostAddressBook(AddressBookItem addressBook)
        {
            if (TelephoneNumberExists(addressBook.telephoneNumber))
            {
                return Conflict();
            }
            addressBook.id = 0; // Set id to 0, so it uses auto increment (in case id is send with the request)
            _context.AddressBook.Add(addressBook); // Add the object
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAddressBooks), new { id = addressBook.id }, addressBook); // Return added object
        }

        // DELETE: AddressBook/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddressBook(int id)
        {
            var addressBook = await _context.AddressBook.FindAsync(id); // Find record via ID search
            if (addressBook == null)
            {
                return NotFound();
            }

            _context.AddressBook.Remove(addressBook); // Delete the record
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Check if the record already exists
        private bool AddressBookExists(int id)
        {
            return _context.AddressBook.Any(e => e.id == id);
        }

        private bool TelephoneNumberExists(string telephoneNumber)
        {
            //var checkTelephoneNumber = _context.AddressBook.Any(ab => ab.telephoneNumber == telephoneNumber);

            return _context.AddressBook.Any(ab => ab.telephoneNumber == telephoneNumber); ;
        }
    }
}
