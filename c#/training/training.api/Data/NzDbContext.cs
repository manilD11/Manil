using Microsoft.EntityFrameworkCore;
using training.api.Models.Domain;

namespace training.api.Data
{
    public class NzDbContext: DbContext
    {
        public NzDbContext(DbContextOptions DBCoptions): base(DBCoptions) 
        {
            
        }
        public DbSet<Difficulty> Difficulties { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Walk> Walks { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var diff = new List<Difficulty>() {
            new Difficulty()
            {
                Id = Guid.Parse("c658ccf9-8943-43ea-af1c-765e451b2943"),
                Name = "Easy"

            },
             new Difficulty()
            {
                Id = Guid.Parse("89935a66-0564-4c26-9044-db7555d54df1"),
                Name = "Medium"

            },
              new Difficulty()
            {
                Id = Guid.Parse("855d4f1a-2259-40f8-9377-9429cc6a022e"),
                Name = "Hard"

            }
            };

            modelBuilder.Entity<Difficulty>().HasData(diff);    
        }
    }
}
