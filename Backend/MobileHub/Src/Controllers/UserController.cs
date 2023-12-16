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
        private readonly DataContext _context;


        public UserController(DataContext context)
        {
            _context = context;
        }

        // la ruta es localhost:5001/api/user (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // editar usuario
        // la ruta es localhost:5001/api/user/{id} (PUT)
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

            if (!string.IsNullOrEmpty(updateDto.Rut))
            {
                user.Rut = updateDto.Rut;
            }

            await _context.SaveChangesAsync();

            return Ok("Usuario actualizado exitosamente " + user.Username + " " + user.Email + " " + user.yearBirth + " " + user.Rut);
        }

    }
}