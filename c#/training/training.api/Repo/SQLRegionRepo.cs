using Microsoft.EntityFrameworkCore;
using training.api.Data;
using training.api.Models.Domain;

namespace training.api.Repo
{
    public class SQLRegionRepo : IRegionRepo
    {
        private readonly NzDbContext dbc;

        public SQLRegionRepo(NzDbContext dbc)
        {
            this.dbc = dbc;
        }

        public async Task<Region> Create(Region region)
        {
            await dbc.Regions.AddAsync(region);
            await dbc.SaveChangesAsync();
            return region;
        }

        public async Task<Region?> Delete(Guid id)
        {
            var region = await dbc.Regions.FirstOrDefaultAsync(r => r.Id == id);
            if (region == null)
            {
                return null;
            }

            dbc.Regions.Remove(region);
            await dbc.SaveChangesAsync();
            return region;

        }

        public async Task<List<Region>> GetAll()
        {
            return await dbc.Regions.ToListAsync();
        }

        public async Task<Region?> GetById(Guid id)
        {
            return await dbc.Regions.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Region?> Update(Guid id, Region region)
        {
            var reg = await dbc.Regions.FirstOrDefaultAsync(x => x.Id == id);
            if (reg == null)
            {
                return null;
            }

            reg.Code=region.Code;
            reg.Name=region.Name;   
            reg.RegionImgURL=region.RegionImgURL;

            await dbc.SaveChangesAsync();
            return reg; 
        }
    }
}
