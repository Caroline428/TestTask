const usersUrl = 'https://json.medrating.org/users/';
const albumsUrl = 'https://json.medrating.org/albums?userId=';
const photoUrl = 'https://json.medrating.org/photos?albumId=';

const btnCatalog = document.querySelector('.btn-catalog')
const mainContent = document.querySelector('.main__content')


btnCatalog.addEventListener('click', clickCatalog)
// mainContent.addEventListener('click', clickUser)

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

async function getAlbums(userID, target) {
    let albums = await fetch(albumsUrl + userID)
        .then(response => response.json())
    albums.forEach(
        function (item, i) {
            displayAlbums(item,i,target)
    })

    return albums
}

async function getPhoto(albumID, target) {
    let photo = await fetch(photoUrl + albumID)
        .then(response => response.json())
    photo.forEach(
        function (item, i) {
            displayPhoto(item, i, target)
        }
    )
    console.log(photo  )
    return photo
}

/////////////////////////////////////////////

function displayUsers(item, i) {
    let username = item.name
    mainContent.insertAdjacentHTML('beforeend',
    `
    <div class="main__item" id="${i}">
        <button class="item__button" id="${i}"> + </button>
        <div class="item__content" id="${i}"> ${username}</div>
    </div>
        `)
}

function displayAlbums(item, i, target) {
    let mainItem = target
    let title = item.title
    mainItem.insertAdjacentHTML('beforeend',
        `
    <div class="main__album" id="${i}">
        <button> + </button>
        <div class="album__content" id="${i}"> ${title}</div>
    </div>
        `)
}

function displayPhoto(item, i, target) {
    let mainItem = target
    console.log(item)
    let thumbnailUrl = item.thumbnailUrl
    mainItem.insertAdjacentHTML('beforeend',
        `
        <div class="album__photo">
            <img src="${thumbnailUrl}">
         </div>
        `
        )
}

////////////////////////////////

function clickCatalog(event) {
    if (mainContent.hasAttribute('hidden')) {
        mainContent.removeAttribute('hidden')
    }
    else {
        mainContent.setAttribute('hidden','true')
    }
}






mainContent.addEventListener('click', function (event) {
    let target = event.target
    if (target.classList.contains('item__content')) {
        let id = target.getAttribute('id')
        getAlbums(id, target)
    }
    else if (target.classList.contains('album__content')) {
        let id = target.getAttribute('id')
        getPhoto(id, target)
    }



})

//Добавление слушателя каждому элементу списка
// function addModEvent() {
//     let mod = document.querySelectorAll('.main__item');
//     for (let i = 0; i < mod.length; i++) {
//         mod[i].addEventListener('click', clickUser);
//     }
// }

// addModEvent();

// document.querySelector('body').addEventListener('click', function(event) {
//     if (event.target.tagName.toLowerCase() === 'li') {
//         // do your action on your 'li' or whatever it is you're listening for
//     } БОЛЕЕ ГИБКОЕ РЕШЕНИЕ, НАДО ПОНЯТЬ, КАК РЕАЛИЗОВАТЬ