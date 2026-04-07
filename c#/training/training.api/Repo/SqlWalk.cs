using Microsoft.AspNetCore.Mvc;
using training.api.Models.Domain;
using training.api.Models.DTO;


namespace training.api.Repo
{
    public interface SqlWalk
    {
        // repo always use domain not DTO
        Task<Walk> Create(Walk walk);
        Task<List<Walk>> GetAll(string? key =null,string? value=null,string? sort=null,bool isA=true, int pg = 1, int pSize = 100);

        Task<Walk?> GetById(Guid id);
        Task<Walk?> UpdateWalk(Guid id, Walk walk);
        Task <Walk?> Delete(Guid id);
    }
}
