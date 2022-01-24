const btnCatalog = document.querySelector('.btn-catalog')
const btnFavorites = document.querySelector('.btn-favourites')
const mainContent = document.querySelector('.main__content')
const mainContainer = document.querySelector('.main__container')

const usersUrl = 'https://json.medrating.org/users/';
const albumsUrl = 'https://json.medrating.org/albums?userId=';
const photoUrl = 'https://json.medrating.org/photos?albumId=';

export {btnFavorites, btnCatalog, mainContent, mainContainer, usersUrl, photoUrl, albumsUrl}