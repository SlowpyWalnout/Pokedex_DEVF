import './style.css'
import axios from 'axios'
import pokemonCard from './src/components/pokemon-card'
import findBar from './src/components/findbar'

const findbutton = document.getElementById('btn-buscar');
const inputElement = document.getElementById('input-pokemon');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const handleError = (error) => {
    console.error(error);
}

const getPokemon = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const getPokemons = async (page) => {
    const number = page * 20;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${number}&offset=${number - 20}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

const updatePokemonList = async (data) => {
    let pokemons = '';
    let pokemonList = data.results
    for (const pokemon of pokemonList) {
        const pokemonDetails = await getPokemon(pokemon.name);
        pokemons += pokemonCard(
            {
                name: capitalizeFirstLetter(pokemonDetails.name),
                image: pokemonDetails.sprites.other['official-artwork'].front_default,
                types: pokemonDetails.types,
                height: pokemonDetails.height,
                weight: pokemonDetails.weight,
                base_experience: pokemonDetails.base_experience
            }
        );
    }
    document.getElementById('pokemons-list').innerHTML = pokemons;
}

let page = 1;

getPokemons(1).then(updatePokemonList);

findbutton.addEventListener('click', async () => {
    try {
        if (inputElement.value === '') {
            alert('Ingrese un nombre de pokemon');
            return;
        } else {
            const pokemonName = inputElement.value;
            const data = await getPokemon(pokemonName);

            let pokemonData = '';
            pokemonData = pokemonCard(
                {
                    name: data.name,
                    image: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                    height: data.height,
                    weight: data.weight,
                    base_experience: data.base_experience
                }
            );
            document.getElementById('finded-pokemon-data').innerHTML = pokemonData;
        }
    } catch (error) {
        handleError(error);
    }
});

btnNext.addEventListener('click', async () => {
    page++;
    const data = await getPokemons(page);
    updatePokemonList(data);
});

btnPrev.addEventListener('click', async () => {
    if (page === 1) {
        alert('Ya estas en la primer pagina');
        return;
    }
    page--;
    const data = await getPokemons(page);
    updatePokemonList(data);
});