const txtCharacter = document.getElementById('txt-character');
const containerCards = document.getElementById('containerCards');
const btnLoadMore = document.getElementById('btn-load-more');
const directionFilter = document.getElementById('direction-filter');

let charactersLoaded = 0;
const charactersPerLoad = 15; 
const baseUrl = "https://thesimpsonsquoteapi.glitch.me/quotes";

const getApi = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        return null;
    }
}

const createCards = (character) => {
    const card = document.createElement('div');
    card.classList.add('card-character');

    const imgCard = document.createElement('img');
    imgCard.src = character.image;
    imgCard.alt = character.character;

    const containerDescription = document.createElement('div');
    containerDescription.classList.add('description-card');

    const nameCharacter = document.createElement('h2');
    nameCharacter.textContent = character.character;

    const quoteCharacter = document.createElement('p');
    quoteCharacter.textContent = character.quote;

    containerDescription.appendChild(nameCharacter);
    containerDescription.appendChild(quoteCharacter);

    card.appendChild(imgCard);
    card.appendChild(containerDescription);

    containerCards.appendChild(card);
}

const generateCharacters = async () => {
    const url = `${baseUrl}?count=${charactersPerLoad}&skip=${charactersLoaded}`;
    const data = await getApi(url);
    charactersLoaded += data.length;
    data.forEach(character => createCards(character));
    if (data.length < charactersPerLoad) {
        btnLoadMore.style.display = 'none';
    }
}

const loadMoreCharacters = async () => {
    const url = `${baseUrl}?count=${charactersPerLoad}&skip=${charactersLoaded}`;
    const data = await getApi(url);
    charactersLoaded += data.length;
    data.forEach(character => createCards(character));
    if (data.length < charactersPerLoad) {
        btnLoadMore.style.display = 'none';
    }
}

const getCharacterByName = async () => {
    containerCards.innerHTML = "";
    const searchValue = txtCharacter.value.trim();
    const url = `${baseUrl}?character=${searchValue}`;
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = await getApi(url);
    data.forEach(character => createCards(character));
}

const filterCharactersByDirection = async (direction) => {
    containerCards.innerHTML = "";
    const searchValue = txtCharacter.value.trim();
    let url = `${baseUrl}?characterDirection=${direction}`;
    
    if (direction === 'left' || direction === 'right') {
        url += `&count=${charactersPerLoad}`;
    }
    
    const data = await getApi(url);
    data.forEach(character => createCards(character));
}


btnLoadMore.addEventListener('click', loadMoreCharacters);
window.addEventListener('DOMContentLoaded', generateCharacters);
txtCharacter.addEventListener('input', getCharacterByName);
directionFilter.addEventListener('change', (event) => {
    const selectedDirection = event.target.value;
    filterCharactersByDirection(selectedDirection);
});
