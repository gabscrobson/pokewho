var pokemonEl = document.querySelector("#pokemonImg")
var guessEl = document.querySelector("#guessBtn")
var skipEl = document.querySelector("#skipBtn")
var guessInputEl = document.querySelector("#guessInput")
var resultEl = document.querySelector("#result")
var guessesEl = document.querySelector("#guesses")
var pokemon, is_shiny

// Enter key to submit guess
guessInputEl.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        guessEl.click()
    }
})

// Guess button click
guessEl.addEventListener("click", () => {
    let guess = guessInputEl.value;
    if (guess.toLowerCase() == pokemon.name) {
        if (!is_shiny) {
            pokemonEl.src = pokemon.sprites.other["official-artwork"].front_default
            resultEl.innerHTML = `You caught a ${capitalizeFirstLetter(pokemon.name)}! +100 cash`
        }
        else {
            pokemonEl.src = pokemon.sprites.other["official-artwork"].front_shiny
            resultEl.innerHTML = `You caught a shiny ${capitalizeFirstLetter(pokemon.name)}! +100 cash`
        }
        guessEl.style.display = "none"
        fetch(`/catch?name=${pokemon.name}&guess=${guess}&is_shiny=${is_shiny}`)
    }
    else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${guess}`)
            .then(response => response.json())
            .then(data => {
                resultEl.innerHTML = `It's not ${capitalizeFirstLetter(guess)}`
                guessesEl.innerHTML += `<div id="guess"><img src="${data.sprites.front_default}">${capitalizeFirstLetter(guess)} is a ${capitalizeFirstLetter(data.types[0].type.name)} type pokemon</div>`
            })
            .catch(error => {
                resultEl.innerHTML = `${capitalizeFirstLetter(guess)} is not a pokemon`
            })
    }
})

// Skip button click
skipBtn.addEventListener("click", () => {
    generatePokemon()
    guessEl.style.display = "inline-block"
    guessInputEl.value = ""
    pokemonEl.src = ""
    resultEl.innerHTML = "Guess the pokemon name to catch it"
    guessesEl.innerHTML = ""
})

// Generate a random pokemon
function generatePokemon() {
    is_shiny = Number(Math.random() < 0.5)  // 0 if false, 1 if true
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1010) + 1}`)
        .then(response => response.json())
        .then(data => {
            pokemon = data
            pokemonEl.src = `/mystery?name=${pokemon.id}`
        })
}

// Capitalize first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

generatePokemon()