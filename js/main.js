const usersUrl = 'https://json.medrating.org/users/';
const albumsUrl = 'https://json.medrating.org/albums?userId=';
const photoUrl = 'https://json.medrating.org/photos?albumId=';

const btnCatalog = document.querySelector('.btn-catalog')
const mainContent = document.querySelector('.main__content')


btnCatalog.addEventListener('click', clickCatalog)

getUsers()


//////////////////////////////////////////
async function getUsers() {
        let users = await fetch(usersUrl)
            .then(response => response.json())
        users.forEach (
            function(item, i) {
                displayUsers(item, i)
            }
        )
        return users
}

async function getAlbums(userID) {
    let albums = await fetch(albumsUrl + userID)
        .then(response => response.json())
    return albums
}

async function getPhoto(albumID) {
    let photo = await fetch(photoUrl + albumID)
        .then(response => response.json())
    return photo
}

/////////////////////////////////////////////

function displayUsers(item, i) {
    let username = item.name
    mainContent.insertAdjacentHTML('beforeend',
    `
    <div class="main__item" id="${i}">
        <button> + </button>
        <div> ${username}</div>
    </div>
        `)
}

function displayAlbums() {

}

function displayPhoto() {

}

////////////////////////////////
// function searchUser  () {
//     const mainItemBtn = document.querySelector('.main__item')
//     mainItemBtn.addEventListener('click', clickUser)
//
// }

function clickCatalog(event) {
    if (mainContent.hasAttribute('hidden')) {
        mainContent.removeAttribute('hidden')
    }
    else {
        mainContent.setAttribute('hidden','true')
    }
}

// function clickUser() {
//     console.log('клик хуик')
// }