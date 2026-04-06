using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using training.api.Models.Domain;
using training.api.Models.DTO;
using training.api.Repo;

namespace training.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalkController : ControllerBase
    {
        private readonly IMapper map;
        private readonly SqlWalk irepo;

        public WalkController(IMapper map, SqlWalk irepo)
        {
            this.map = map;
            this.irepo = irepo;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddWalkDTO walkDto)
        {
            if (ModelState.IsValid)
            {

                // Map DTO to Domain Model
                var walkDomain = map.Map<Walk>(walkDto);

                var AddWalk = await irepo.Create(walkDomain);

                var walkss = map.Map<WalkDTO>(AddWalk);

                return Ok(walkss);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpGet]
        public async Task<IActionResult> Getall()
        {
            var walk = await irepo.GetAll();

            var walks = map.Map<List<WalkDTO>>(walk);

            return Ok(walks);
        }


        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var walk = await irepo.GetById(id);
            if (walk == null)
            {
                return null;
            }
            var walks = map.Map<WalkDTO>(walk);

            return Ok(walks);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateWalkDTO Upw)
        {
            if (ModelState.IsValid)
            {
                var w = map.Map<Walk>(Upw);
                var walk = await irepo.UpdateWalk(id, w);
                if (walk == null)
                {
                    return NotFound();
                }

                var walks = map.Map<WalkDTO>(walk);

                return Ok(walks);

            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> Delete([FromRoute] Guid id) {

            var walk = await irepo.Delete(id);
            if (walk == null)
            {
                return NotFound();
            }

            var walks = map.Map<WalkDTO>(walk);

            return Ok(walks);


        }
    } }

