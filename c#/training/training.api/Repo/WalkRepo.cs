using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<List<Walk>> GetAll(string? key =null,string? value=null, string? sort = null, bool isA = true, int pg = 1,int pSize = 100)
        {
            //var walks = await db.Walks.Include("Difficulty").Include("Region").ToListAsync();
            //return walks;

            var walks = db.Walks.Include("Difficulty").Include("Region").AsQueryable();
            if (string.IsNullOrWhiteSpace(key) == false && string.IsNullOrWhiteSpace(value) == false)
            {
                if(key.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    walks = walks.Where(x => x.Name.Contains(value));
                }
            }

            if (string.IsNullOrWhiteSpace(sort) == false)
            {
                if (sort.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    walks = isA? walks.OrderBy(x=>x.Name):walks.OrderByDescending(x=>x.Name);
                }
                else if (sort.Equals("Length", StringComparison.OrdinalIgnoreCase))
                {
                    walks = isA ? walks.OrderBy(x => x.LengthInKm) : walks.OrderByDescending(x => x.LengthInKm);
                }

            }

            var size = (pg - 1) * pSize;


            return await walks.Skip(size).Take(pSize).ToListAsync();
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
