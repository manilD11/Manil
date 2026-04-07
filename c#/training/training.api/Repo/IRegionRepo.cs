using training.api.Models.Domain;

namespace training.api.Repo
{
    public interface IRegionRepo
    {
        Task<List<Region>> GetAll(string? filterOn=null, string? filterQuery=null);

        Task<Region?> GetById(Guid id);

        Task<Region> Create(Region region);

        Task<Region?> Update(Guid id,  Region region);

        Task<Region?> Delete(Guid id);
    }
}
