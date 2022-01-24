import {usersUrl, albumsUrl, photoUrl, mainContent} from "./constant.js";
import {displayPreLoader, displayUsers, displayError, removePreLoader,
        displayAlbums, displayPhoto} from "./view.js";

async function getUsers() {
    displayPreLoader(mainContent)
    try {
        let users = await fetch(usersUrl)
            .then(response => response.json())
        users.forEach(
            function (item) {
                displayUsers(item, mainContent)
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
        let albums = await fetch(albumsUrl + userID)
            .then(response => response.json())
        albums.forEach(
            function (item) {
                displayAlbums(item, userID, target)
            })
    }
    catch (e) {
        displayError(target)
    }
    finally {
        removePreLoader()
    }
}

async function getPhoto(albumID, target) {
    displayPreLoader(target)
    try {
        let photo = await fetch(photoUrl + albumID)
            .then(response => response.json())
        photo.forEach(
            function (item) {
                displayPhoto(item, albumID, target)
            }
        )
    }
    catch (e) {
        displayError(target)
    }
    finally {
        removePreLoader()
    }
}

export {getUsers, getAlbums, getPhoto}
