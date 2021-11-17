using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BackendNew.Models;

namespace BackendNew.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BookSubmissionsController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/BookSubmissions
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        public IQueryable<BookSubmission> GetBookSubmissions()
        {
            return db.BookSubmissions;
        }

        // GET: api/BookSubmissions/5
        [ResponseType(typeof(BookSubmission))]
        public IHttpActionResult GetBookSubmission(int id)
        {
            BookSubmission bookSubmission = db.BookSubmissions.Find(id);
            if (bookSubmission == null)
            {
                return NotFound();
            }

            return Ok(bookSubmission);
        }

        // PUT: api/BookSubmissions/5
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBookSubmission(int id, BookSubmission bookSubmission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookSubmission.BSId)
            {
                return BadRequest();
            }

            db.Entry(bookSubmission).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookSubmissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(bookSubmission);
        }

        // POST: api/BookSubmissions
        [ResponseType(typeof(BookSubmission))]
        public IHttpActionResult PostBookSubmission(BookSubmission bookSubmission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookSubmissions.Add(bookSubmission);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bookSubmission.BSId }, bookSubmission);
        }

        // DELETE: api/BookSubmissions/5
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        [ResponseType(typeof(BookSubmission))]
        public IHttpActionResult DeleteBookSubmission(int id)
        {
            BookSubmission bookSubmission = db.BookSubmissions.Find(id);
            if (bookSubmission == null)
            {
                return NotFound();
            }

            db.BookSubmissions.Remove(bookSubmission);
            db.SaveChanges();

            return Ok(bookSubmission);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookSubmissionExists(int id)
        {
            return db.BookSubmissions.Count(e => e.BSId == id) > 0;
        }
    }
}