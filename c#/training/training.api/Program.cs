using Microsoft.EntityFrameworkCore;
using training.api.Data;
using training.api.Repo;
using training.api.Mappings;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// this is Db connection class 
builder.Services.AddDbContext<NzDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("NZwalksCS")));


// This are Repositry from where u can access the data 
builder.Services.AddScoped<IRegionRepo, SQLRegionRepo>();
builder.Services.AddScoped<SqlWalk, WalkRepo>();
//builder.Services.AddScoped<IRegionRepo, InMemoryRepo>();



//builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAutoMapper(cfg => { }, AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
