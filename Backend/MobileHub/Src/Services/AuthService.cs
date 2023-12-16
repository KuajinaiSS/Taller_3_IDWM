
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MobileHub.Data;
using MobileHub.DTO;
using MobileHub.Models;
using MobileHub.Src.Services.interfaces;
using System.Text;

namespace MobileHub.Src.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        


        public async Task<LoginResponseDto> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user is null) return null;

            var validPassword = loginDto.Rut == user.Rut;
            if (!validPassword) return null;

            var token = GenerateJwtToken(user);

            var loginResponseDto = new LoginResponseDto
            {
                Token = token,
                Email = user.Email,
            };

            return loginResponseDto;
        }


        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>{
                new ("email", user.Email)
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    _configuration.GetSection("AppSettings:Token").Value!));

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