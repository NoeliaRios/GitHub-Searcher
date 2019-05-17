const clientId = '1bdf77874d539b78c9ed';
const clientSecret = '4a1769b47ff7b03618226f664593537acba3e3ba';
const cantidadDeRepos = 5;

// `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`
//datos del usuario
//(https://api.github.com/users/ezeggonzalez?client_id=1bdf77874d539b78c9ed&client_secret=4a1769b47ff7b03618226f664593537acba3e3ba)

// `https://api.github.com/users/${user}/repos?per_page=${cantidadDeRepos}&sort=${reposSort}&client_id=${clientId}&client_secret=${clientSecret}`
//lista de repos
//en cantidadDeRepos colocar el numero de repos que quiero que sean mostrados
// (https://api.github.com/users/${user}/repos?per_page=5&sort=&client_id=1bdf77874d539b78c9ed&client_secret=4a1769b47ff7b03618226f664593537acba3e3ba)



const input = document.querySelector('#search-form input');

function traerDatos () {
  // me guardo el valor del input
  const user = input.value;

  // if (user.length > 0) {
  // if (user !== '') {
  if (user) {
    // hacemos el fetch
    const url = `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`;
    console.log(url);
    const urlRepos = `https://api.github.com/users/${user}/repos?per_page=${cantidadDeRepos}&client_id=${clientId}&client_secret=${clientSecret}`;
    console.log(urlRepos);

    fetch (urlRepos)
      .then(res => res.json())
      .then(repos => {
          //repos son todos los arrays
        console.log(repos);

        const repositoriesList = [];

        repos.forEach(function (repo) {
            //repo es cada array
          const repoName = repo.full_name.split('/')[1];
          // const repoName = repo.full_name.replace(`${repo.owner.login}/`, '');

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

    fetch (url)
      .then(res => res.json())
      .then(userInfo => {
        // console.log(userInfo);

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

// agregamos un listener al boton del formulario
document
  .querySelector('#search-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    traerDatos();
  });



// const input = document.querySelector('input');
// const image = document.querySelector('img');
// const name = document.querySelector('#name');
// const repos = document.querySelector('#repos');
// const followers = document.querySelector('#followers');
// const following = document.querySelector('#following');
// const listaRepos = document.querySelector('.list-group');


// input.addEventListener('keypress', function(e){
//     if(event.keyCode === 13){
//         const user = input.value;

//         fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`)
//             .then(res => res.json())
//             .then(login => {

//                 image.src = login.avatar_url;
//                 name.innerText = user.login;
                
//                 followers.innerText = user.followers;
//                 following.innerText = user.following;

//             })
//     }
// })


