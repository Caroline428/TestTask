let favouritePhoto = []

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
    favouritePhoto = (JSON.parse(localStorage.getItem('favourite'))) || []
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

export {addFavorite, removeFavorite, getFavourites, searchFavourite, favouritePhoto}