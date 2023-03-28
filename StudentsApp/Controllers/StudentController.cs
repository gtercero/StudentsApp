using StudentsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StudentsApp.Controllers
{
    public class StudentController : ApiController
    {
        GrethelTerceroDBEntities1 db = new GrethelTerceroDBEntities1();
        
        [HttpGet]
        public IEnumerable<StudentInformation> Get()
        {
            IEnumerable<StudentInformation> stu = db.StudentInformation.ToList();
            List<string> names;
            foreach (var item in stu)
            {
                names = new List<string>();
                item.Hobbies = db.StudentsHobbies.Where(d => d.ID_Student == item.ID).ToList();
                foreach (var itemN in item.Hobbies)
                {
                    var hobbie = db.Hobbies.Where(d => d.ID == itemN.ID).FirstOrDefault();
                    names.Add(hobbie.Hobbie);
                }
                item.HobbieName = names;
            }
            return stu;
        }
        [HttpGet]
        public StudentInformation GetById(string id)
        {
            return db.StudentInformation.FirstOrDefault(item => item.ID == id);
        }
        [HttpPost]
        public IHttpActionResult Post(StudentInformation stu)
        {
            stu.ID = Guid.NewGuid().ToString();
            db.StudentInformation.Add(stu);

            foreach (var item in stu.Hobbies)
            {
                item.ID_Student = stu.ID.ToString();
            }
            db.StudentsHobbies.AddRange(stu.Hobbies);
            db.SaveChanges();

            return Ok();
        }
        [HttpPut]
        public IHttpActionResult Update(StudentInformation stu)
        {
            var student = db.StudentInformation.Where(st => st.ID == stu.ID).FirstOrDefault();
            student.Name = stu.Name;
            student.Email = stu.Email;
            student.Phone = stu.Phone;
            student.Zip = stu.Zip;

            db.Entry(student).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            IEnumerable<StudentsHobbies> hobbies = db.StudentsHobbies.Where(st => st.ID_Student == stu.ID).ToList();
            db.StudentsHobbies.RemoveRange(hobbies);
            foreach (var item in stu.Hobbies)
            {
                item.ID_Student = stu.ID.ToString();
            }
            db.StudentsHobbies.AddRange(stu.Hobbies);
            db.SaveChanges();

            return Ok();
        }
    }
}
