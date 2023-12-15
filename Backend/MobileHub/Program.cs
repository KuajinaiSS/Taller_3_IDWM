using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using MobileHub.Data;

var builder = WebApplication.CreateBuilder(args);

Env.Load();
var ip = Env.GetString("LOCAL_IP");

var mobileHubOrigin = "_mobilehub";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: mobileHubOrigin,
        policy =>
        {
            policy.WithOrigins(ip)
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});




// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// codigo base de datos
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite("Data Source=MobileHub.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(mobileHubOrigin);

app.UseAuthorization();

app.MapControllers();

app.Run();
