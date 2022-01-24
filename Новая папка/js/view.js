import {mainContent} from "./constant.js";
import {searchFavourite} from "./storageRequests.js";

function displayUsers(item, target) {
    let username = item.name
    let id = item.id
    target.insertAdjacentHTML('beforeend',
        `
    <div class="main__item" id="${id}">
        <div class="item__box">
            <button class="list_button" id="${id}"> 
                +
             </button>   
            <div class="item_title" id="${id}"> 
            ${username}
            </div>
        </div>
    </div>
        `)
}

function displayAlbums(item, userID, target) {
    let title = item.title
    let id = item.id
    target.insertAdjacentHTML('beforeend',
        `
    <div class="main__album" id="${id}">
        <div class="album__box">
             <button class="list_button" id="${id}">
                + 
              </button>
            <div class="album_title" id="${id}">
            ${title}
            </div>
        </div>
    </div>
        `)
}

function displayPhoto(item, albumID, target) {
    let id = item.id
    let thumbnailUrl = item.thumbnailUrl
    let url = item.url
    let title =  item.title
    target.insertAdjacentHTML('beforeend',
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

function displayFavouritePhoto(item, target) {
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

function displayFavouriteEmpty(target) {
    let img = 'images/empty.png'
    target.insertAdjacentHTML('beforeend',
        `
            <div class="favourite_empty"> 
                <img src="${img}" alt="Список избранного пуст">
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
           <img src="${url}" alt="Большая фотография">
         </div>
         <span class="close">
        </span>
    </div>
    `)
}

function displayPreLoader(target) {
    let preLoader = 'images/loader.gif'
    target.parentElement.insertAdjacentHTML('afterend',
        `
        <div class="preloader">
            <img src="${preLoader}" alt="Идет загрузка...">
        </div>
        `)
}

function displayError(target) {
    let imgUrl = 'images/error.png'
    target.parentElement.insertAdjacentHTML('afterend',
        `
        <div class="error">
            <img src="${imgUrl}" alt="Сервер не отвечает">
            <div>
            <div class="bold">Сервер не отвечает</div>
            <div>Уже работаем над этим</div>
            </div>
        </div>
        `)
}

function removePreLoader() {
    let preLoader = document.querySelector('.preloader')
    preLoader.remove()
}

function removeError(target) {
    target.remove()
}

export {displayUsers, displayAlbums, displayPhoto, displayFavouritePhoto, displayFavouriteEmpty,
    displayModal, displayPreLoader, displayError, removePreLoader, removeError}