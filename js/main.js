const usersUrl = 'https://json.medrating.org/users/';
const albumsUrl = 'https://json.medrating.org/albums?userId=';
const photoUrl = 'https://json.medrating.org/photos?albumId=';

const btnCatalog = document.querySelector('.btn-catalog')
const btnFavorites = document.querySelector('.btn-favourites')
const mainContent = document.querySelector('.main__content')
const mainContainer = document.querySelector('.main__container')

let favouritePhoto = []
start()

btnCatalog.addEventListener('click', getContent)
btnFavorites.addEventListener('click', getFavouritesContent)

mainContent.addEventListener('click', async function (event) {
    let target = event.target
    let id = target.getAttribute('id')


    if (target.classList.contains('item_title') && !target.classList.contains('open') ) {
        let box = target.parentElement
        let button = target.previousElementSibling
        button.innerHTML = '-'
        box.insertAdjacentHTML('afterend', `<div class="item__content item__content_${id}"> </div>`)
        await getAlbums(id, target)
        target.classList.add('open')
    }

    else if (target.classList.contains('item_title') && target.classList.contains('open') ) {
        let but = target.previousElementSibling
        but.innerHTML = '+'
        let deleteTarget = document.querySelector(`.item__content_${id}`)
        deleteTarget.remove()
        target.classList.remove('open')
    }

    else if (target.classList.contains('album_title') && !target.classList.contains('open')) {
        let box = target.parentElement
        box.insertAdjacentHTML('afterend', `<div class="album__content album__content_${id}"> </div>`)
        await getPhoto(id, target)
        target.classList.add('open')
    }

    else if (target.classList.contains('album_title') && target.classList.contains('open') ) {
        let deleteTarget = document.querySelector(`.album__content_${id}`)
        deleteTarget.remove()
        target.classList.remove('open')
    }
    else if (target.classList.contains('star') && target.classList.contains('empty')) {
        addFavorite(target)
        target.classList.remove('empty')
        target.classList.add('active')
    }
    else if (target.classList.contains('star') && target.classList.contains('active')) {
        removeFavorite(target)
        target.classList.remove('active')
        target.classList.add('empty')
    }
    else if (target.classList.contains('photo')) {
        displayModal(target)
    }

})

mainContainer.addEventListener('click', function (event) {
        let target = event.target
        if (target.classList.contains('modal')) {
            target.remove()
        }
    })

async function start() {
 await   getContent()
    getFavourites()
}


async function getContent() {
    if (btnFavorites.classList.contains('btn_active')) {
        btnFavorites.classList.remove('btn_active')
        mainContent.innerHTML = ''
    }
    btnCatalog.classList.add('btn_active')
    await getUsers()

}

function getFavouritesContent() {
    btnCatalog.classList.remove('btn_active')
    btnFavorites.classList.add('btn_active')
    mainContent.innerHTML = '<div class="main__favourite"></div>'
    getFavourites()
    if (favouritePhoto.length === 0) {
        displayFavouriteEmpty()
    }
    else {
        for (let value of favouritePhoto.values()) {
            let val = Object.values(value)
            displayFavouritePhoto(val)
        }
    }
}

//////////////////////////////////////////
function addFavorite(target) {
    let image = target.previousElementSibling
    let id = image.getAttribute('id')
    let urlThumbnail = image.getAttribute('src')
    let url = image.parentElement.getAttribute('href')
    let title = image.getAttribute('title')
    let photo = {
        id: id,
        title: title,
        urlThumbnail: urlThumbnail,
        url: url
    }
    favouritePhoto.push(photo)
    updateFavourite()

}

function updateFavourite() {
    localStorage.setItem('favourite', JSON.stringify(favouritePhoto))
}

function removeFavorite(target) {
    let id = target.previousElementSibling.getAttribute('id')
    favouritePhoto = favouritePhoto.filter((el) => Number(el.id) !== Number(id))
    updateFavourite()

}

function getFavourites() {
    favouritePhoto = JSON.parse(localStorage.getItem('favourite') || [])

}

function searchFavourite(id) {
    let bol = false
    for (let value of favouritePhoto.values()) {
        bol = Object.values(value).includes(id.toString())
        if (bol) {
            break
        }
    }
    return bol
}


//////////////////////////////////////////
async function getUsers() {
    displayPreLoader(mainContent)
    try {
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
}

async function getAlbums(userID, target) {
    displayPreLoader(target)
    try {
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
}

async function getPhoto(albumID, target) {
    displayPreLoader(target)
    try {
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
}

/////////////////////////////////////////////

function displayUsers(item) {
    let username = item.name
    let id = item.id
    mainContent.insertAdjacentHTML('beforeend',
    `
    <div class="main__item" id="${id}">
        <div class="item__box">
            <button class="button" id="${id}"> 
                +
             </button>   
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
             <button class="button"> + </button>
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
    let url = item.url
    let title =  item.title
    mainItem.insertAdjacentHTML('beforeend',
        `
        <div class="album__photo album__photo_${id}" id="${id}">
            <a href="${url}" onclick="return false">
                <img class="photo" src="${thumbnailUrl}" title="${title}" id="${id}">          
            <button class="star ${searchFavourite(id) ? 'active' : 'empty'}"></button>
             </a>
         </div>
        `
        )
}

function displayFavouritePhoto(item) {
    let target = mainContent.firstChild
    let id = item[0]
    let title = item[1]
    let thumbnailUrl = item[2]
    let url = item[3]

    target.insertAdjacentHTML('beforeend',
            `
            <div class="album__photo album__photo_${id}" id="${id}">
                 <div class="photo__content">
                     <a href="${url}" onclick="return false">
                       <img class="photo" src="${thumbnailUrl}" title="${title}" id="${id}">          
                      <button class="star active"></button>
                     </a>
                     <div> ${title}</div>
                 </div>
             </div>
            `
        )
}

function displayFavouriteEmpty() {
    let target = mainContent.firstChild
    let img = 'images/empty.png'
    target.insertAdjacentHTML('beforeend',
        `
            <div class="favourite_empty"> 
                <img src="${img}">
                    <div class="bold">Список избранного пуст</div>
                    <div>Добавляйте изображения, нажимая на звездочки</div>
            </div>
            `
    )
}

function displayModal(target) {
    let url = target.parentElement.getAttribute('href')
    mainContent.insertAdjacentHTML('afterend', `
    <div class="modal">
        <div class="modal__img">
           <img src="${url}">
         </div>
    </div>
    `)
}

function displayPreLoader(target) {
    let preLoader = 'images/loader.gif'

    target.insertAdjacentHTML('afterend',
        `
        <div class="preloader">
            <img src="${preLoader}">
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









