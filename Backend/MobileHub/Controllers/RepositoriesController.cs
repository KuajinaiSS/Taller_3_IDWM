// TODO : colcoar token del David

using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTO;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class RepositoriesController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<GitHubCommit>>> Get() // para usar commits <GitHubCommit>, para repositorios <Repository>
        {
            Env.Load();

            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var TokenCredential = new Credentials(myToken);

            client.Credentials = TokenCredential;

            // var repositories = (await client.Repository.GetAllForUser("KuajinaiSS")).ToList();
            // return repositories;

            var commits = (await client.Repository.Commit.GetAll("KuajinaiSS", "Taller_3_IDWM")).ToList();
            return commits;
        }

        //Register
        [HttpPost]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            return Ok();
        }





    }
} 