var pokemonBox = document.querySelector(".pokemonBox");

for (p of pokemon) {
    if (p.is_shiny == 1) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then(response => response.json())
            .then(data => {
                pokemonBox.innerHTML += 
                `<div class="pokemon">
                    <img src="${data.sprites.front_shiny}">
                    <div class="pokemonName">${data.name}</div>
                </div>`
            })
    }
    else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then(response => response.json())
            .then(data => {
                pokemonBox.innerHTML += 
                `<div class="pokemon">
                    <img src="${data.sprites.front_default}">
                    <div class="pokemonName">${data.name}</div>
                </div>`
            })
    }
}