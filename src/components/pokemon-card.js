function pokemonCard({name, image, types, height, weight, base_experience}){
    return `
    <div class="pokemon-card">
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p>Altura: ${height}</p>
        <p>Peso: ${weight}</p>
        <p>Experiencia base: ${base_experience}</p>
        <h3>Tipos:</h3>
        <ul>
            ${types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
    </div>`;
}
export default pokemonCard;