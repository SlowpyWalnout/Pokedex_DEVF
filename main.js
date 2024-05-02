import './style.css'
import axios from 'axios'

const findbutton = document.getElementById('btn-buscar');
const inputElement = document.getElementById('input-pokemon');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

const getPokemon = async (name) => {
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}

const getPokemons = async (page) => {
    const number = page * 20;
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=${number - 20}`);
        return response.data;
    }catch(error){
        console.error(error);
    }
}
let page = 1;

getPokemons(1).then(data => {
    let pokemons = '';
    data.results.forEach(pokemon => {
        pokemons += `
        <div class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
        </div>`;
    });
    document.getElementById('pokemons-list').innerHTML = pokemons;
});


findbutton.addEventListener('click', async () => {
    try{
        if (inputElement.value === '') {
            alert('Ingrese un nombre de pokemon');
            return;
        }else {
            const pokemonName = inputElement.value;
            const data = await getPokemon(pokemonName);
            let pokemonData = '';
            pokemonData += `<h2>${data.name}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
            <p>Experiencia base: ${data.base_experience}</p>
            <h3>Tipos:</h3>
            <ul>`;
            data.types.forEach(type => {
                pokemonData += `<li>${type.type.name}</li>`;
            });
            console.log(data);
            document.getElementById('finded-pokemon-data').innerHTML = pokemonData;
        }
    }catch(error){
        console.error(error);
    }
});
btnNext.addEventListener('click', async () => {
    page++;
    const data = await getPokemons(page);
    let pokemons = '';
    data.results.forEach(pokemon => {
        pokemons += `
        <div class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
        </div>`;
    });
    document.getElementById('pokemons-list').innerHTML = pokemons;
});
btnPrev.addEventListener('click', async () => {
    if (page === 1) {
        alert('Ya estas en la primer pagina');
        return;
    }
    page--;
    const data = await getPokemons(page);
    let pokemons = '';
    data.results.forEach(pokemon => {
        pokemons += `
        <div class="pokemon-card">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
        </div>`;
    });
    document.getElementById('pokemons-list').innerHTML = pokemons;
});