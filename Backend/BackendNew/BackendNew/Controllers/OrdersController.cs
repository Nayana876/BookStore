using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Data.SqlClient;
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
    public class OrdersController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/Orders
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        public IQueryable<Order> GetOrders()
        {
            return db.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        public IHttpActionResult GetOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        public IHttpActionResult PutOrder(int id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderId)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.ToString());
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(order);
        }

        // POST: api/Orders
        [ResponseType(typeof(Order))]

        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.UserInfoes.Find(order.UserId).Status != "active")
                return Unauthorized();


            Debug.WriteLine(order.OrderId);
            db.Orders.Add(order);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                if (OrderExists(order.OrderId))
                {
                    return Conflict();
                }
                else
                {
                    throw(ex);
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        public IHttpActionResult DeleteOrder(int id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(int id)
        {
            return db.Orders.Count(e => e.OrderId == id) > 0;
        }
    }
}