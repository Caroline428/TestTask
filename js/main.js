const usersUrl = 'https://json.medrating.org/users/';
const albumsUrl = 'https://json.medrating.org/albums?userId=';
const photoUrl = 'https://json.medrating.org/photos?albumId=';

const btnCatalog = document.querySelector('.btn-catalog')
const btnFavorites = document.querySelector('.btn-favourites')
const mainContent = document.querySelector('.main__content')
const mainButton = document.querySelector('.main__button')


 start()





function start() {
    getContent()
    btnCatalog.addEventListener('click', getContent)
    btnFavorites.addEventListener('click', getFavourites)
}

function getContent() {
    if (btnFavorites.classList.contains('btn_active')) {
        btnFavorites.classList.remove('btn_active')
        mainContent.innerHTML = ''
    }
    btnCatalog.classList.add('btn_active')
    getUsers()
    mainContent.addEventListener('click', function (event) {
        let target = event.target
        let id = target.getAttribute('id')


        if (target.classList.contains('item_title') && !target.classList.contains('open') ) {
            let box = document.querySelector('.item__box')
            box.insertAdjacentHTML('afterend', `<div class="item__content item__content_${id}"> </div>`)
            getAlbums(id, target)
            target.classList.add('open')
        }

        else if (target.classList.contains('item_title') && target.classList.contains('open') ) {
            let deleteTarget = document.querySelector(`.item__content_${id}`)
            deleteTarget.remove()
            target.classList.remove('open')
        }

        else if (target.classList.contains('album_title') && !target.classList.contains('open')) {
            let box = document.querySelector('.album__box')
            box.insertAdjacentHTML('afterend', `<div class="album__content album__content_${id}"> </div>`)
            getPhoto(id, target)
            target.classList.add('open')
        }

        else if (target.classList.contains('album_title') && target.classList.contains('open') ) {
            let deleteTarget = document.querySelector(`.album__content_${id}`)
            deleteTarget.remove()
            target.classList.remove('open')
        }
    })
}

function getFavourites() {
    btnCatalog.classList.remove('btn_active')
    btnFavorites.classList.add('btn_active')
    mainContent.innerHTML = ''

}


//////////////////////////////////////////
async function getUsers() {

    try {
        displayPreLoader(mainContent)
        let users = await fetch(usersUrl)
            .then(response => response.json())

        users.forEach(
            function (item) {
                displayUsers(item)

            }
        )
    }
    catch (e) {
        alert('Ошибка при загрузке списка пользователей')
        displayError(mainContent)
    }
    finally {
        removePreLoader(mainContent)
    }
        // return users
}

async function getAlbums(userID, target) {

    try {
         displayPreLoader(target)
        let mainItem = document.querySelector(`.item__content_${userID}`)
        let albums = await fetch(albumsUrl + userID)
            .then(response => response.json())
        albums.forEach(
            function (item) {

                displayAlbums(item, mainItem)
            })
    }
    catch (e) {
        alert('Ошибка при загрузке альбомов')
        displayError(target)
    }
    finally {
         removePreLoader()

    }


    // return albums
}

async function getPhoto(albumID, target) {

    try {
         displayPreLoader(target)
        let mainItem = document.querySelector(`.album__content_${albumID}`)
        let photo = await fetch(photoUrl + albumID)
            .then(response => response.json())
        photo.forEach(
            function (item) {
                displayPhoto(item, mainItem)
            }
        )
    }
    catch (e) {
        alert('Ошибка при загрузке фотографий')
        displayError(target)
    }
    finally {
         removePreLoader()
    }


    // return photo
}

/////////////////////////////////////////////

function displayUsers(item) {
    let username = item.name
    let id = item.id
    mainContent.insertAdjacentHTML('beforeend',
    `
    <div class="main__item" id="${id}">
        <div class="item__box">
            <button class="button_plus_minus" id="${id}"> + </button>   
            <div class="item_title" id="${id}"> 
            ${username}
            </div>
        </div>
            
    </div>
        `)
}

function displayAlbums(item, mainItem) {
    let title = item.title
    let id = item.id


    mainItem.insertAdjacentHTML('beforeend',
        `
    <div class="main__album" id="${id}">
        <div class="album__box">
             <button class="button_plus_minus"> + </button>
            <div class="album_title" id="${id}">
            ${title}
            </div>
        </div>
    </div>
        `)
}

function displayPhoto(item, mainItem) {
    let id = item.id

    let thumbnailUrl = item.thumbnailUrl
    mainItem.insertAdjacentHTML('beforeend',
        `
        <div class="album__photo">
            <img src="${thumbnailUrl}">
            <button class="star empty"></button>
         </div>
        `
        )
}

////////////////////////////////

function displayPreLoader(target) {
    let preLoader = 'images/loader.gif'

    target.insertAdjacentHTML('afterend',
        `
        <div class="preloader">
            <img src="${preLoader}"
        </div>
        `)
}


function displayError(target) {
    let gifUrl = 'images/error.png'
    target.insertAdjacentHTML('beforeend',
        `
        <div>
            <img src="${gifUrl}"
        </div>
        `)
}

function removePreLoader() {
    let preLoader = document.querySelector('.preloader')
    preLoader.remove()

}

function removeError() {

}


///////////////////////////////

// function clickCatalog(event) {
//     if (mainContent.hasAttribute('hidden')) {
//         mainContent.removeAttribute('hidden')
//     }
//     else {
//         mainContent.setAttribute('hidden','true')
//     }
// }







