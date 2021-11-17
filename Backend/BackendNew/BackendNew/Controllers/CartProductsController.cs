using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Migrations;
using System.Diagnostics;
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
    public class CartProductsController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/CartProducts
        public IQueryable<CartProduct> GetCartProducts()
        {
            return db.CartProducts;
        }

        // GET: api/CartProducts/5
        [ResponseType(typeof(CartProduct))]
        public IHttpActionResult GetCartProduct(int id)
        {
            CartProduct cartProduct = db.CartProducts.Find(id);
            if (cartProduct == null)
            {
                return NotFound();
            }

            return Ok(cartProduct);
        }

        // PUT: api/CartProducts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCartProduct(int id, CartProduct cartProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cartProduct.CPId)
            {
                return BadRequest();
            }

            // Used to get an primary key error when updating. 
            db.Set<CartProduct>().AddOrUpdate(cartProduct);
            //db.Entry(cartProduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartProductExists(id))
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

        // POST: api/CartProducts
        [ResponseType(typeof(CartProduct))]
        public IHttpActionResult PostCartProduct(CartProduct cartProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.CartProducts.Add(cartProduct);
                db.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }

            return CreatedAtRoute("DefaultApi", new { id = cartProduct.CPId }, cartProduct);
        }

        // DELETE: api/CartProducts/5
        [ResponseType(typeof(CartProduct))]
        public IHttpActionResult DeleteCartProduct(int id)
        {
            Debug.WriteLine(id);
            CartProduct cartProduct = db.CartProducts.Find(id);
            if (cartProduct == null)
            {
                return NotFound();
            }

            db.CartProducts.Remove(cartProduct);
            db.SaveChanges();

            return Ok(cartProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CartProductExists(int id)
        {
            return db.CartProducts.Count(e => e.CPId == id) > 0;
        }
    }
}