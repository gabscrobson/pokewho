const playerPokemonDivEl = document.querySelector('#playerPokemonDiv');
const othersPokemonDivEl = document.querySelector('#othersPokemonDiv');
const mainEl = document.querySelector('main');

for (let p of pokemon_at_sale) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then(response => response.json())
            .then(data => {
                let pokemonHtml = 
                `<div class="playerPokemon">
                    <div class="pokemon">
                        <img src="${p.is_shiny ? data.sprites.front_shiny : data.sprites.front_default}">
                        ${p.is_shiny ? '<i id="shinyStar" class="fa-sharp fa-solid fa-star" style="color: #de2b2b;"></i>' : ''}
                    </div>
                    <div class="pokemonId" style="display: none">${p.id}</div>
                    <b>${capitalizeFirstLetter(data.name)}</b>
                    <b>$${p.price}</b>
                    <button class="btn btn-primary">${p.user_id == session["user_id"] ? "Get back" : "Buy"}</button>
                </div>`;

                if (p.user_id == session["user_id"]) {
                    playerPokemonDivEl.innerHTML += pokemonHtml;
                }
                else {
                    othersPokemonDivEl.innerHTML += pokemonHtml;
                }

            })
}

// Add event listener to main for click events
mainEl.addEventListener("click", (e) => {
    // If the click is on a playerPokemon button
    if (e.target && e.target.matches(".playerPokemon .btn")) {
        let element = e.target;
        let id = +(element.parentElement.querySelector(".pokemonId").innerText)
        let method = element.parentElement.querySelector(".btn").innerText == "Get back" ? "get_back" : "buy";

        console.log(id)
        console.log(method)
        
        // Send POST request to market
        fetch('/market', {
            method: 'POST',
            body: JSON.stringify({
                method: method,
                id: id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log(response.status)
            if (response.status == 200) {
                location.reload();
            }
            else if (response.status == 401) {
                alert("Not enough cash")
            }
          });
    }
});


// Capitalize first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}