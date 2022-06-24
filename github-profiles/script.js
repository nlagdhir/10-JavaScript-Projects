const APIURL = 'https://api.github.com/users/';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('#search');

const getUser = async (username) => {
    const resp = await (await fetch(APIURL + username)).json();

    createUserCard(resp);

    getRepos(username);
}

const getRepos = async (username) => {
    const resp = await (await fetch(APIURL + username + '/repos')).json();

    addReposToCard(resp);
}

getUser('nlagdhir')

const createUserCard = (user) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHTML = `
        <div class="card">
            <div class="img-container">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div class="repos" id="repos">    
                    
                </div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

const addReposToCard = (repos) => {
    const reposEl = document.querySelector('#repos');

    repos.forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;   
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);

    })
}

form.addEventListener('submit',event => {
    event.preventDefault();

    const user = search.value;
    if(user) {
        getUser(user);
        search.value = '';
    }
})