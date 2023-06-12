'use strict';

const ulElement = document.querySelector('.js_list');
const ulFavorites = document.querySelector('.js_fav-list');
//const searchButton = document.querySelector('.js_searchBtn');
const url = 'https://dev.adalab.es/api/disney?pageSize=15';

let listCharacters = [];
let listCharactersFav = [];
const favoritesLS = JSON.parse(localStorage.getItem('favoristesList'));

function local() {
  if (favoritesLS) {
    listCharacters = favoritesLS;
    renderCharacter(listCharacters);
  } else {
    fetchCharacters();
  }
}

//renderizar todos los personajes con bucle
function renderAllCharacters(listCharacters) {
  for (const character of listCharacters) {
    ulElement.innerHTML += renderCharacter(character);
  }
}
//renderizar el primer personaje
function renderCharacter(oneCharacter) {
  return `<li id="${oneCharacter._id}" class="list_items js_li-characters"><img src="${oneCharacter.imageUrl}"><p> ${oneCharacter.name}</p></li>`;
}
//peticion a la API de los personajes
function fetchCharacters() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      listCharacters = data.data;
      renderAllCharacters(listCharacters);
      clickEventFavoriteCharacter();
      localStorage.setItem('favoritesList', JSON.stringify(listCharactersFav));
    });
}

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
}

//click en el <li>
function clickEventFavoriteCharacter() {
  const liElementClick = document.querySelectorAll('.js_li-characters');
  for (const li of liElementClick) {
    li.addEventListener('click', handleClick);
  }
}

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
  ulFavorites.classList.add('list_fav');
}
