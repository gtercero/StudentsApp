using StudentsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StudentsApp.Controllers
{
    public class HobbieController : ApiController
    {
        GrethelTerceroDBEntities1 db = new GrethelTerceroDBEntities1();
        [HttpGet]
        public IEnumerable<Hobbies> Get()
        {
            return db.Hobbies.ToList();
        }
        [HttpGet]
        public IEnumerable<StudentsHobbies> GetByStudent(string id)
        {
            return db.StudentsHobbies.Where(stu => stu.ID_Student == id).ToList();
        }
       
    }
}
