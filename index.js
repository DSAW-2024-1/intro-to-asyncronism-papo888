const txtCharacter = document.getElementById('txt-character');
const containerCards = document.getElementById('containerCards');
const btnLoadMore = document.getElementById('btn-load-more');
let charactersLoaded = 0;
const charactersPerLoad = 10; 
const url = "https://thesimpsonsquoteapi.glitch.me/quotes?count=" + charactersPerLoad + "&character";

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
    const data = await getApi(url);
    charactersLoaded += data.length;
    data.map(character => createCards(character));
    if (data.length < charactersPerLoad) {
        btnLoadMore.style.display = 'none';
    }
}

const loadMoreCharacters = async () => {
    const data = await getApi(url + "&skip=" + charactersLoaded);
    charactersLoaded += data.length;
    data.map(character => createCards(character));
    if (data.length < charactersPerLoad) {
        btnLoadMore.style.display = 'none';
    }
}

btnLoadMore.addEventListener('click', loadMoreCharacters);
window.addEventListener('DOMContentLoaded', generateCharacters);
