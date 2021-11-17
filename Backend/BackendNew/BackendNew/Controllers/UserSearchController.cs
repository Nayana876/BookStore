using BackendNew.Models;
using System;
using System.Collections.Generic;
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

namespace BackendNew.Controllers
{

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UserSearchController : ApiController
    {

        private BookStoreDbEntities db = new BookStoreDbEntities();
        
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [HttpPut]
        [ActionName("update")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserInfo()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            int id1 = int.Parse(httpRequest["UserId"]);
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            if (postedFile != null)
            {
                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmddms") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/uploads/" + imageName);
                postedFile.SaveAs(filePath);
            }
            UserInfo userInfo1 = new UserInfo()
            {
                UId = id1,
                FName = httpRequest["FName"],
                LName = httpRequest["LName"],
                Password = httpRequest["Password"],
                PhoneNo = httpRequest["PhoneNo"],
                ProfilePic = imageName,

            };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id1 != userInfo1.UId)
            {
                return BadRequest();
            }

            db.Entry(userInfo1).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                    throw;
                
            }

            return Ok(userInfo1);
        }


        //: api/UserSeas/{username}
        [HttpPost]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        [ActionName("FindUserByUserNameOREmail")]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult FindUserByUserNameOREmail(UserInfo reqUser)
        {
            UserInfo resUser;

            if (reqUser.Email == "")
            {
                resUser = db.UserInfoes.FirstOrDefault(user => user.UserName == reqUser.UserName);

            }
            else
            {
                resUser = db.UserInfoes.FirstOrDefault(user => user.Email == reqUser.Email);

                if (resUser == null && reqUser.UserName != "")  //possibility of giving invalid email but correct username
                {
                    resUser = db.UserInfoes.FirstOrDefault(user => user.UserName == reqUser.UserName);
                }
            }

            if (resUser == null)
                return NotFound();
            else
                return Ok(resUser);
        }

    }
}
