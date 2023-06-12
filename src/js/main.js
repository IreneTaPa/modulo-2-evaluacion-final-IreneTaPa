'use strict';

const ulElement = document.querySelector('.js_list');
const ulFavorites = document.querySelector('.js_fav-list');
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchBtn');
const url = 'https://dev.adalab.es/api/disney?pageSize=15';
const urlMoreCharacters = 'https://api.disneyapi.dev/character';

let listCharacters = [];
let listCharactersFav = [];
let anotherCharacters = [];

//renderizar todos los personajes con bucle
function renderAllCharacters(listCharacters) {
  for (const character of listCharacters) {
    ulElement.innerHTML += renderCharacter(character);
  }
}
//renderizar personaje
function renderCharacter(oneCharacter) {
  return `<li id="${oneCharacter._id}" class="list_items js_li-characters"><img class="image" src="${oneCharacter.imageUrl}"><p> ${oneCharacter.name}</p></li>`;
}
//renderizar lista guardada en el localStorage
const favoritesLS = JSON.parse(localStorage.getItem('favoritesList'));
if (favoritesLS !== null) {
  listCharactersFav = favoritesLS;
  renderFavCharacterList();
}

//peticion a la API de los personajes
function fetchCharacters() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      listCharacters = data.data;
      renderAllCharacters(listCharacters);
      clickEventFavoriteCharacter();
    })
    .catch((error) => {
      console.error(error);
    });
}
//que la petición a la API se visualice al cargar la pagina
fetchCharacters();

//pintar favoritos en otra lista
function renderFavCharacterList() {
  //no repetir personaje
  ulFavorites.innerHTML = '';
  //bucle para pintar personajes favoritos
  for (const listFav of listCharactersFav) {
    ulFavorites.innerHTML += renderCharacter(listFav);
    console.log(listFav);
  }

  localStorage.setItem('favoritesList', JSON.stringify(listCharactersFav));
}

//click en el <li>
function clickEventFavoriteCharacter() {
  const liElementClick = document.querySelectorAll('.js_li-characters');
  for (const li of liElementClick) {
    li.addEventListener('click', handleClick);
  }
}
// funcion para que al hacer click se genere una nueva lista con personajes fav
function handleClick(event) {
  const id = parseInt(event.currentTarget.id);
  const selectedFav = listCharacters.find((item) => item._id === id);
  console.log(selectedFav);
  const indexCharacter = listCharactersFav.findIndex((item) => item._id === id);
  console.log(indexCharacter);
  if (indexCharacter === -1) {
    listCharactersFav.push(selectedFav);
  } else {
    listCharactersFav.splice(indexCharacter, 1);
  }
  console.log(listCharactersFav);
  renderFavCharacterList();
}

function moreCharacters(event) {
  event.preventDefault();
  fetch(urlMoreCharacters)
    .then((response) => response.json())
    .then((moreData) => (anotherCharacters = moreData.data));
}

searchButton.addEventListener('click', moreCharacters);
