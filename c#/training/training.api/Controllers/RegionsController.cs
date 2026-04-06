using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using training.api.CustomValidation;
using training.api.Data;
using training.api.Models.Domain;
using training.api.Models.DTO;
using training.api.Repo;

namespace training.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase

    {
        private NzDbContext dbContext;
        private readonly IRegionRepo irRepo;
        private readonly IMapper mapper;

        public RegionsController(NzDbContext dbContext, IRegionRepo IrRepo, IMapper mapper)
        {
            this.dbContext = dbContext;
            irRepo = IrRepo;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        { 

            //var regions = await dbContext.Regions.ToListAsync();

            var regions = await irRepo.GetAll();


            //Manual Mapping 

            //var regionDTO = new List<RegionDTO>();
            //foreach (var r in regions)
            //{
            //    regionDTO.Add(new RegionDTO() {
            //        Id=r.Id,
            //        Code = r.Code,
            //        Name = r.Name,
            //        RegionImgURL = r.RegionImgURL,
            //    });
            //}

            var regionDTO = mapper.Map<List<RegionDTO>>(regions);
            return Ok(regionDTO);
            }


            [HttpGet]
            [Route("{id:Guid}")]

            public async Task<IActionResult> GetbyId([FromRoute] Guid id)
            {
                //var regions = await dbContext.Regions.FindAsync(id);
                //var regions = await dbContext.Regions.FirstOrDefault(x => x.Id ==  id);


            var region = await irRepo.GetById(id);
                
               if (region == null)
                {
                    return NotFound();
                }
                else
            { 

                var regionDTO = mapper.Map<RegionDTO>(region);
                    return Ok(regionDTO);
                }
            }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddRegion AddRegion)
        {
            if (ModelState.IsValid)
            {
                var region = mapper.Map<Region>(AddRegion);

                region = await irRepo.Create(region);

                var regionDto = mapper.Map<RegionDTO>(region);
                return CreatedAtAction(nameof(GetbyId), new { id = region.Id }, regionDto);
            }
            else
            {
                return BadRequest(ModelState);
            }
            

        }

        [HttpPut]
        [ValidationMode]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateRegion upReg)
        {
          

                var reg = mapper.Map<Region>(upReg);

                var region = await irRepo.Update(id, reg);
                if (region == null)
                {
                    return NotFound();
                }
                var regionDTO = mapper.Map<RegionDTO>(reg);

                return Ok(regionDTO);

        }

        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var region = await irRepo.Delete(id);

            if (region == null)
            {
                return NotFound();
            }

            var regionDTO = mapper.Map<RegionDTO>(region);
            return Ok(regionDTO);
        }
    }
    } 
