// Get pokemon box element
var pokemonBox = document.querySelector(".pokemonBox");

// Check if user is viewing their own profile
var is_owner = user["username"] == session["username"];

for (let p of pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
            .then(response => response.json())
            .then(data => {
                pokemonBox.innerHTML += 
                `<div class="pokemon">
                    <img src="${p.is_shiny ? data.sprites.front_shiny : data.sprites.front_default}">
                    <div class="pokemonName">${capitalizeFirstLetter(data.name)}</div>
                    <div class="pokemonId" style="display: none">${p.id}</div>
                    ${p.is_shiny ? '<i id="shinyStar" class="fa-sharp fa-solid fa-star" style="color: #de2b2b;"></i>' : ''}
                    ${p.is_favorite ? '<i id="favoritedHeart" class="fa-solid fa-heart"></i>' : (is_owner ? '<i id="favoriteHeart" class="fa-regular fa-heart"></i>' : "")}
                </div>`
            })
}

// Add event listener to pokemonBox for click events
pokemonBox.addEventListener("click", (e) => {
    // If the click is on a favorite heart
    if (e.target && e.target.matches("#favoriteHeart") && is_owner) {
        let element = e.target
        let id = +(element.parentElement.querySelector(".pokemonId").innerText)

        element.classList.remove("fa-regular");
        element.classList.add("fa-solid");
        element.id = "favoritedHeart";
        
        // Send POST request to favorite pokemon
        fetch('/favorite', {
            method: 'POST',
            body: JSON.stringify({
              id: id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log(response.status)
          });
    }
    // If the click is on a favorited heart
    else if (e.target && e.target.matches("#favoritedHeart") && is_owner) {
        let element = e.target
        let id = +(element.parentElement.querySelector(".pokemonId").innerText)

        element.classList.remove("fa-solid");
        element.classList.add("fa-regular");
        element.id = "favoriteHeart";

        // Send POST request to favorite pokemon
        fetch('/favorite', {
            method: 'POST',
            body: JSON.stringify({
              id: id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            console.log(response.status)
          });
    }
});

// Capitalize first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}