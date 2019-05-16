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





document
    .querySelector('#search-form .search-btn')
    .addEventListener('click', function (e){
        const user = input.value;

        //validamos el input(tiene que tener contenido)
        // if(user.length>0){
        // if(user!== ''){
        if (user){

            const url = `https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`;
            const urlRepos = `https://api.github.com/users/${user}/repos?per_page=${cantidadDeRepos}&sort=${reposSort}&client_id=${clientId}&client_secret=${clientSecret}`;

            fetch(urlRepos)
                .then( res => res.json())
                .then (repos =>{
                    console.log(repos);

                    const repositoriesList = [];

                    repos.forEach(function(repos){
                        repositoriesList.push(`<a href="${repo.html_url}" target="_blank" class="list-group-item list-group-item-action">${repo.fullName}</a>`)
                    });

                    document.querySelector('#profile .list-group').innerHTML = repositoriesList.join('');
                })

            fetch(url)
                .then(res => res.json())
                .then(userInfo =>{
                    console.log(userInfo)

                    document.querySelector('#profile .card .card-img-top').src = userInfo.avatar_url;
                    document.querySelector('#profile .card .card.title').innerHTML = user.login;
                    document.querySelector('#profile .card a').setAttribute('href', userInfo.html_url);
                    // document.querySelector('#profile .card #repos').innerHTML = userInfo.
                });

        }
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


