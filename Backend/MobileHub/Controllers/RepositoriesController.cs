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
        public async Task<ActionResult<IEnumerable<RepositoryDto>>> GetAll() // para usar commits <GitHubCommit>, para repositorios <Repository>
        {

            var client = new GitHubClient(new ProductHeaderValue("MobileHub"));
            var myToken = Env.GetString("GITHUB_ACCESS_TOKEN");
            var TokenCredential = new Credentials(myToken);

            client.Credentials = TokenCredential;

            var repositories = await client.Repository.GetAllForUser("KuajinaiSS"); // Dizkm8

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
            var commits = await client.Repository.Commit.GetAll("KuajinaiSS", repositoryName);

            if(commits is null) return 0;
            return commits.Count();
        }


    }
}