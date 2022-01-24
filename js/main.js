import {getUsers} from "./apiRequests.js";
import {btnCatalog, btnFavorites, mainContainer, mainContent} from "./constant.js";
import {getFavourites} from "./storageRequests.js";
import {displayFavouriteEmpty, displayFavouritePhoto, displayModal} from "./view.js";
import {favouritePhoto} from "./storageRequests.js";
import  * as clickProc  from "./clickProcessing.js";
import {getAlbums, getPhoto} from "./apiRequests.js";
import {addFavorite, removeFavorite} from "./storageRequests.js";

await start()

btnCatalog.addEventListener('click', getContent)

btnFavorites.addEventListener('click', getFavouritesContent)

mainContent.addEventListener('click', async function (event) {
    let target = event.target
    let id = target.getAttribute('id')
    let targetClassList = target.classList

    if (targetClassList.contains('item_title') && !targetClassList.contains('open')) {
         await clickProc.openItem(target, id, `<div class="item__content"> </div>`, getAlbums)
    }

    else if (targetClassList.contains('item_title') && targetClassList.contains('open') ) {
       clickProc.closeItem(target)
    }

    else if (targetClassList.contains('album_title') && !targetClassList.contains('open')) {
       await clickProc.openItem(target, id, `<div class="album__content"> </div>`, getPhoto)
    }

    else if (targetClassList.contains('album_title') && targetClassList.contains('open') ) {
        clickProc.closeItem(target)
    }

    else if (targetClassList.contains('star') && targetClassList.contains('empty')) {
        clickProc.addStarCondition(target, 'empty', 'active', addFavorite)
    }

    else if (targetClassList.contains('star') && targetClassList.contains('active')) {
        clickProc.addStarCondition(target, 'active','empty',  removeFavorite)
    }

    else if (targetClassList.contains('photo')) {
        displayModal(target)
    }

})

mainContainer.addEventListener('click', function (event) {
        let target = event.target
        let targetClassList = target.classList
        if (targetClassList.contains('modal') || targetClassList.contains('close')) {
            if (targetClassList.contains('modal')) {
                target.remove()
            }
            else {
                target.parentElement.remove()
            }
        }
    })

async function start() {
    await getContent()
    getFavourites()
}

async function getContent() {
    if (btnFavorites.classList.contains('btn_active')) {
        btnFavorites.classList.remove('btn_active')
    }
    mainContent.innerHTML = ''
    btnCatalog.classList.add('btn_active')
    await getUsers()
}

function getFavouritesContent() {
    btnCatalog.classList.remove('btn_active')
    btnFavorites.classList.add('btn_active')
    mainContent.innerHTML = '<div class="main__favourite"></div>'
    let target =  mainContent.firstChild
    getFavourites()
    if (favouritePhoto.length === 0) {
        displayFavouriteEmpty(target)
    }
    else {
        for (let value of favouritePhoto.values()) {
            let val = Object.values(value)
            displayFavouritePhoto(val, target)
        }
    }
}
