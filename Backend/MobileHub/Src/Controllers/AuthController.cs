using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MobileHub.Data;
using MobileHub.DTO;
using MobileHub.Models;
using DotNetEnv;


namespace MobileHub.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        // Metodo Login
        // la ruta es localhost:5001/api/auth/login (POST)
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user is null) return NotFound("Usuario no encontrado");

            var validPassword = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);
            if (!validPassword) return BadRequest("Contraseña invalida");

            var token = CreateToken(user);

            return Ok(token);
        }



        // Metodo Register
        // la ruta es localhost:5001/api/auth/register (POST)
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == registerDto.Email);
            if (user is not null) return BadRequest("Email ya registrado");
            var userRut = await _context.Users.FirstOrDefaultAsync(x => x.Rut == registerDto.Rut);
            if (userRut is not null) return BadRequest("Rut ya registrado");

            var newUser = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                Rut = registerDto.Rut,
                yearBirth = registerDto.yearBirth,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Rut)
            };

            var createdUser = (await _context.Users.AddAsync(newUser)).Entity;
            await _context.SaveChangesAsync();

            var token = CreateToken(createdUser);
            return Ok(token);
        }


        private string CreateToken(User user)
        {
            var claims = new List<Claim>{
                new ("email", user.Email)
            };

            var sectret = Env.GetString("TOKEN").ToString();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(sectret));


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

    }
}