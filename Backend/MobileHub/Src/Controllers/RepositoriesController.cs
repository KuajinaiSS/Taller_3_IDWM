// TODO : colcoar token del David

using DotNetEnv;
using Microsoft.AspNetCore.Mvc;
using MobileHub.DTO;
using MobileHub.Src.DTO;
using Octokit;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class RepositoriesController : ControllerBase
    {

        // la ruta es localhost:5001/api/repositories (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDto>>> GetAll() // para usar commits <GitHubCommit>, para repositorios <Repository>
        {

            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var TokenCredential = new Credentials(myToken);

            client.Credentials = TokenCredential;

            var repositories = await client.Repository.GetAllForUser("Dizkm8"); // Dizkm8

            repositories = repositories.OrderByDescending(repository => repository.CreatedAt).ToList();

            var getCommitsTasks = repositories.Select( r => GetCommitAmountByRepository(client, r.Name));

            var commitsResults = await Task.WhenAll(getCommitsTasks);

            var mappedRepositories = repositories.Select((repository,index) =>
            {
                var entity = new RepositoryDto
                {
                    name = repository.Name,
                    CreatedAt = repository.CreatedAt,
                    UpdateAt = repository.UpdatedAt,
                    CommitsAmount = commitsResults[index]
                };
                return entity;
            });

            // mappedRepositories = mappedRepositories.OrderByDescending(repository => repository.CreatedAt).ToList();


            return Ok(mappedRepositories);

        }

        private async Task<int> GetCommitAmountByRepository(GitHubClient client, string repositoryName)
        {
            var commits = await client.Repository.Commit.GetAll("Dizkm8", repositoryName);

            if(commits is null) return 0;
            return commits.Count();
        }

        // ver los commits de un repositorio
        // la ruta es localhost:5001/api/repositories/{repositoryName} (GET)
        [HttpGet("{repositoryName}")]
        public async Task<ActionResult<IEnumerable<CommitDto>>> GetCommitsByRepository(string repositoryName)
        {
            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var TokenCredential = new Credentials(myToken);
            client.Credentials = TokenCredential;

            var commits = await client.Repository.Commit.GetAll("Dizkm8", repositoryName);

            if (commits is null) return NotFound();

            var mappedCommits = commits.Select(c => new CommitDto
            {
                Message = c.Commit.Message,
                Author = c.Commit.Author.Name,
                Date = c.Commit.Author.Date
            });

            return Ok(mappedCommits);
        }


    }
}