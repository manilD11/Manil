using training.api.Models.Domain;

namespace training.api.Repo
{

    // This is an example to show other Db can be accessed
    public  class InMemoryRepo: IRegionRepo
    {
        public async Task<List<Region>> GetAll() {
            return new List<Region> { new Region(){
                Id = Guid.NewGuid(),
                Code = "007",
                Name = "Test 1",

                 }
            };
        }

        Task<Region> IRegionRepo.Create(Region region)
        {
            throw new NotImplementedException();
        }

        Task<Region?> IRegionRepo.Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        Task<Region?> IRegionRepo.GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        Task<Region?> IRegionRepo.Update(Guid id, Region region)
        {
            throw new NotImplementedException();
        }
    } }
