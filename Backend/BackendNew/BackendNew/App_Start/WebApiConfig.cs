using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BackendNew
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            config.EnableCors();
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();


           // config.Routes.MapHttpRoute(
           //    name: "FindUserByUserNameOREmail",
           //    routeTemplate: "api/admin/FindUserByUserNameOREmail",
           //    defaults: new { controller = "userInfoes", action = "FindUserByUserNameOREmail" }
           //);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional}
            );
        }
    }
}
