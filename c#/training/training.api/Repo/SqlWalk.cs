using Microsoft.AspNetCore.Mvc;
using training.api.Models.Domain;
using training.api.Models.DTO;


namespace training.api.Repo
{
    public interface SqlWalk
    {
        // repo always use domain not DTO
        Task<Walk> Create(Walk walk);
        Task<List<Walk>> GetAll();

        Task<Walk?> GetById(Guid id);
        Task<Walk?> UpdateWalk(Guid id, Walk walk);
        Task <Walk?> Delete(Guid id);
    }
}
