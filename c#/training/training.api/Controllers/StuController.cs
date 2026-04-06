using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace training.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StuController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllStu()
        {
            string[] students = new string[] { "Virat", "Salt", "DDP", "Rajat" };
            return Ok(students);
        }
    }
}