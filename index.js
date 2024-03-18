const txtCharacter = document.getElementById('txt-character');
const containerCards = document.getElementById('containerCards');
const btnLoadMore = document.getElementById('btn-load-more');
let charactersLoaded = 0;
const charactersPerLoad = 15; 
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

const generateCharacterByName = async (event) => {
    containerCards.innerHTML = "";

    // Si el campo de búsqueda está vacío, simplemente generamos todos los personajes
    if (event.target.value.trim() === '') {
        generateCharacters();
        return; // Salimos de la función para evitar ejecutar el resto del código
    }

    // Construye la URL para buscar por el nombre del personaje
    const searchUrl = `https://thesimpsonsquoteapi.glitch.me/quotes?character=${event.target.value}`;

    try {
        // Realiza una solicitud a la API con la URL construida
        const data = await getApi(searchUrl);

        // Crea las cartas para cada personaje en los datos devueltos por la API
        data.forEach(character => {
            createCards(character);
        });
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}



btnLoadMore.addEventListener('click', loadMoreCharacters);
window.addEventListener('DOMContentLoaded', generateCharacters);
txtCharacter.addEventListener('keyup',generateCharacterByName);
