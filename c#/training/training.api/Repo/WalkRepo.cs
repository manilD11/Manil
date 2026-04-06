using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using training.api.Data;
using training.api.Models.Domain;

namespace training.api.Repo
{
    public class WalkRepo : SqlWalk
    {
        private readonly NzDbContext db;

        public WalkRepo(NzDbContext db)
        {
            this.db = db;
        }
        public async Task<Walk> Create(Walk walk)
        {
            await db.Walks.AddAsync(walk);
            await db.SaveChangesAsync();

            return walk;
             
        }

        public async Task<Walk?> Delete(Guid id)
        {
            var walk = await db.Walks.FirstOrDefaultAsync(x => x.Id == id);
            if (walk == null)
            {
                return null;
            }
            db.Walks.Remove(walk);
            await db.SaveChangesAsync();

            return walk;
        }

        public async Task<List<Walk>> GetAll()
        {
            var walks = await db.Walks.Include("Difficulty").Include("Region").ToListAsync();
            return walks;
        }

        public async Task<Walk?> GetById(Guid id)
        {
            var walk = await db.Walks.Include("Difficulty").Include("Region").FirstOrDefaultAsync(x => x.Id == id);
            return walk;
        }

        public async Task<Walk?> UpdateWalk(Guid id, Walk walk)
        {
            var w = await db.Walks.FirstOrDefaultAsync(x => x.Id == id);
            if (w == null)
            {
                return null;
            }
            w.Name = walk.Name;
            w.Description = walk.Description;
            w.LengthInKm = walk.LengthInKm;
            w.WalkImgURL = walk.WalkImgURL;
            w.DifficultyId = walk.DifficultyId;
            w.RegionId = walk.RegionId;


            await db.SaveChangesAsync();
            return w;
        }
    }
}
