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
    public class CartsController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/Carts
        public IQueryable<Cart> GetCarts()
        {
            return db.Carts;
        }

        // GET: api/Carts/5
        [ResponseType(typeof(Cart))]
        public IHttpActionResult GetCart(int id)
        {
            Cart cart = db.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        // PUT: api/Carts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCart(int id, Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cart.CartId)
            {
                return BadRequest();
            }

            db.Entry(cart).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        [ResponseType(typeof(Cart))]
        public IHttpActionResult PostCart(Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carts.Add(cart);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CartExists(cart.CartId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = cart.CartId }, cart);
        }

        // DELETE: api/Carts/5
        [ResponseType(typeof(Cart))]
        public IHttpActionResult DeleteCart(int id)
        {
            Cart cart = db.Carts.Find(id);
            if (cart == null)
            {
                return NotFound();
            }

            db.Carts.Remove(cart);
            db.SaveChanges();

            return Ok(cart);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartExists(int id)
        {
            return db.Carts.Count(e => e.CartId == id) > 0;
        }
    }
}