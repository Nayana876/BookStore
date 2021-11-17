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
using System.Web.Http.Results;
//using System.Web.Mvc;
using BackendNew.Models;

namespace BackendNew.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserInfoesController : ApiController
    {
        private BookStoreDbEntities db = new BookStoreDbEntities();

        // GET: api/UserInfoes
        [ActionName("DefaultApi")]
        public IQueryable<UserInfo> GetUserInfoes()
        {
            return db.UserInfoes;
        }

        // GET: api/UserInfoes/5
        [ResponseType(typeof(UserInfo))]
        [ActionName("DefaultApi")]
        public IHttpActionResult GetUserInfo(int id)
        {
            UserInfo userInfo = db.UserInfoes.Find(id);
            if (userInfo == null)
            {
                return NotFound();
            }

            return Ok(userInfo);
        }

        // : api/UserInfoes/{username}
        //[HttpPost]
        //[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        //[ActionName("FindUserByUserNameOREmail")]
        //[ResponseType(typeof(UserInfo))]
        //public IHttpActionResult FindUserByUserNameOREmail(UserInfo reqUser)
        //{
        //    UserInfo resUser;

        //    if (reqUser.Email == "")
        //    { 
        //        resUser = db.UserInfoes.FirstOrDefault(user => user.UserName == reqUser.UserName);
      
        //    }
        //    else
        //    {
        //        resUser = db.UserInfoes.FirstOrDefault(user => user.Email == reqUser.Email);

        //        if (resUser == null && reqUser.UserName != "")  //possibility of giving invalid email but correct username
        //        {
        //            resUser = db.UserInfoes.FirstOrDefault(user => user.UserName == reqUser.UserName);
        //        }
        //    }

        //    if (resUser == null)
        //        return NotFound();
        //    else
        //        return Ok(resUser);
        //}

        // PUT: api/UserInfoes/5
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        //[ResponseType(typeof(void))]
        public IHttpActionResult PutUserInfo(int id)
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //int id1 = 11;
                //int.Parse(httpRequest["UserId"]);
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            if (postedFile != null)
            {
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmddms") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/Images/" + imageName);
                postedFile.SaveAs(filePath);
            }
            UserInfo userInfo1 = new UserInfo();
            IHttpActionResult actionResult = this.GetUserInfo(id);
            var contentResult = actionResult as OkNegotiatedContentResult<UserInfo>;
            userInfo1 = contentResult.Content;
            userInfo1.FName = httpRequest["FName"];
            userInfo1.LName = httpRequest["LName"];
            userInfo1.Password = httpRequest["Password"];
            userInfo1.PhoneNo = httpRequest["PhoneNo"];
            if(imageName!=null)
            userInfo1.ProfilePic = imageName;
    
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userInfo1.UId)
            {
                return BadRequest();
            }
            //db.Entry(userInfo1).State = EntityState.Unchanged;
            db.Entry(userInfo1).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                return BadRequest();

            }

            return Ok();
        }

     

        // POST: api/UserInfoes  -- Sign In
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult PostUserInfo(UserInfo userInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Can be further optimised by creating two tables each of which only hold email and username as thier primary keys
            UserInfo user = db.UserInfoes.FirstOrDefault(x => x.Email == userInfo.Email);
            if (user != null)
            {
                return StatusCode(HttpStatusCode.NotAcceptable);  //Same Email Found -> retund 406
            }
            user = db.UserInfoes.FirstOrDefault(x => x.UserName == userInfo.UserName);
            if (user != null)
            {
                return StatusCode(HttpStatusCode.Conflict);  //Same username Found -> retund 409
            }

            try
            {
                userInfo.Coins = 100;
                userInfo.Role = "user";
                userInfo.Status = "active";
                userInfo.ProfilePic = "profile.png";

                db.UserInfoes.Add(userInfo);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = userInfo.UId }, userInfo);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // DELETE: api/UserInfoes/5
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult DeleteUserInfo(int id)
        {
            UserInfo userInfo = db.UserInfoes.Find(id);
            if (userInfo == null)
            {
                return NotFound();
            }

            db.UserInfoes.Remove(userInfo);
            db.SaveChanges();

            return Ok(userInfo);
        }

        //Login
        [HttpPut]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("DefaultApi")]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult LoginUser(UserInfo userInfo) //but only the email and passoword fields be popluated
        {
            UserInfo user = db.UserInfoes.FirstOrDefault(x => x.Email == userInfo.Email);
            if (user == null)
            {
                
                return StatusCode(HttpStatusCode.NotFound);  //Returns as null in frontend for NO USER found.
            }
            else
            {
                if (user.Password == userInfo.Password)
                {
                    //return Ok("hello");
                    
                    return Ok(user);
                    
                }
                else
                {
                    //return BadRequest("Invalid Credentials");  //Invalid credentials -- returning w the typed in model state -400
                    return StatusCode(HttpStatusCode.Unauthorized);
                }
            }

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserInfoExists(int id)
        {
            return db.UserInfoes.Count(e => e.UId == id) > 0;
        }

        
    }
}