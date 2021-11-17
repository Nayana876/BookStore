using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BackendNew.Models;

namespace BackendNew.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BooksController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/Books
        public IQueryable<Book> GetBooks()
        {
            return db.Books;
        }

        // GET: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult GetBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBook(int id, Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.BookId)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Books
        //[ResponseType(typeof(Book))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
          public  IHttpActionResult PostBook()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            if (postedFile != null)
            {
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                postedFile.SaveAs(filePath);
            }

            Book book = new Book()
            {
                CId = int.Parse(httpRequest["CId"]),
                Title = httpRequest["Title"],
                Author = httpRequest["Author"],
                ISBN = httpRequest["ISBN"],
                BookYear = httpRequest["BookYear"],
                BRating = float.Parse(httpRequest["BRating"]),
                Quantity = int.Parse(httpRequest["Quantity"]),
                Price = float.Parse(httpRequest["Price"]),
                BDescri = httpRequest["Bdescri"],
                BPosition = int.Parse(httpRequest["BPosition"]),
                BCondition = httpRequest["BCondition"],
                BTags = httpRequest["BTags"],
                BImgFile = imageName

            };
                
             try
             {
                db.Books.Add(book);
                db.SaveChanges();
              }
             catch
             {
                return BadRequest();
             }

            
            return CreatedAtRoute("DefaultApi", new { id = book.BookId }, book);
            //return Request.CreateResponse(HttpStatusCode.Created);
        }

        // DELETE: api/Books/5
        [ResponseType(typeof(Book))]
        public IHttpActionResult DeleteBook(int id)
        {
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.Books.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookExists(int id)
        {
            return db.Books.Count(e => e.BookId == id) > 0;
        }
    }
}
