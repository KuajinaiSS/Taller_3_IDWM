using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileHub.Data;
using MobileHub.DTO;
using MobileHub.Models;

namespace MobileHub.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        /***
         * Metodo para obtener los usuarios en la ruta :5148/api/user (GET)
         * @return IEnumerable<User> retorna los usuarios
         */
        private readonly DataContext _context;



        /***
         * Constructor de la clase UserController
         * @param DataContext contexto de la base de datos
         */
        public UserController(DataContext context)
        {
            _context = context;
        }



        /***
         * Metodo para obtener un usuario por su id en la ruta :5148/api/user/{id} (GET)
         * @param int id del usuario a obtener
         * @return User retorna el usuario
         */
        [HttpGet("{email}")]
        public async Task<ActionResult<User>> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null) return NotFound();
            return Ok(user);
        }



        /***
         * Metodo para obtener todos los usuarios en la ruta :5148/api/user (GET)
         * @return IEnumerable<User> retorna los usuarios
         */
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }



        /***
         * Metodo para registrar un usuario en la base de datos en la ruta :5148/api/user/register (POST)
         * @param RegisterDto datos del usuario a registrar
         * @return string retorna el token del usuario
         */
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateDto updateDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null) return NotFound();

            if (!string.IsNullOrEmpty(updateDto.Username))
            {
                user.Username = updateDto.Username;
            }

            if (!string.IsNullOrEmpty(updateDto.Email))
            {
                user.Email = updateDto.Email;
            }

            if (updateDto.yearBirth != default)
            {
                user.yearBirth = updateDto.yearBirth;
            }

            if (!string.IsNullOrEmpty(updateDto.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(updateDto.Password);
            }

            await _context.SaveChangesAsync();

            return Ok("Usuario actualizado exitosamente User" + user.Username + "\nEmail: " + user.Email + "\nAño: " + user.yearBirth + "\nPass: " + user.Password);
        }

    }
}