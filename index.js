const clientId = '1bdf77874d539b78c9ed';
const clientSecret = '4a1769b47ff7b03618226f664593537acba3e3ba';
const cantidadDeRepos = 5;

const input = document.querySelector('#search-form input');

function traerDatos() {
  const user = input.value;

  if (user) {
    const url = `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`;
    console.log(url);
    const urlRepos = `https://api.github.com/users/${user}/repos?per_page=${cantidadDeRepos}&client_id=${clientId}&client_secret=${clientSecret}`;
    console.log(urlRepos);

    fetch(urlRepos)
      .then(res => res.json())
      .then(repos => {
        console.log(repos);
        const repositoriesList = [];

        repos.forEach(function (repo) {
          const repoName = repo.full_name.split('/')[1];

          repositoriesList.push(`<a href="${repo.html_url}" target="_blank" class="list-group-item list-group-item-action">${repoName}</a>`);
        });
        //versión con MAP
        // const repositoriesList = repos.map(function(repo){
        //     const repoName = repo.full_name.split('/')[1];
        //     return `<a href="${repo.html_url}" target="_blank" class="list-group-item list-group-item-action">${repoName}</a>`
        // });

        document
          .querySelector('#profile .list-group')
          .innerHTML = repositoriesList.join('');
      })

    fetch(url)
      .then(res => res.json())
      .then(userInfo => {

        document
          .querySelector('#profile .card .card-img-top')
          .src = userInfo.avatar_url;
        document
          .querySelector('#profile .card .card-title')
          .innerHTML = userInfo.login;
        document
          .querySelector('#profile .card a')
          .setAttribute('href', userInfo.html_url);
        document
          .querySelector('#profile .card #public-repos')
          .innerHTML = userInfo.public_repos;
        document
          .querySelector('#profile .card #followers')
          .innerHTML = userInfo.followers;
        document
          .querySelector('#profile .card #following')
          .innerHTML = userInfo.following;
      })
  }
}

document
  .querySelector('#search-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    traerDatos();
  });
