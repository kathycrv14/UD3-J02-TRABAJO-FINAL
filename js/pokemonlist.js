
const pokemonSelector = document.getElementById("selectpokemon")
const btnAgregarFavorito = document.getElementById("btnAgregarFavorito")
const imgPokemon = document.getElementById("imgPokemon")

const namepokemon = document.getElementById("namepokemon")

const imgpokeball = document.getElementById("imgpokeball")



imgpokeball.style.display = "none";

//fetch para llenar el select
fetch(`https://pokeapi.co/api/v2/generation/1/`)
.then(response => response.json())
.then(data => {
    const pokemons = data.pokemon_species

for (const index in pokemons){
const option = document.createElement('option');
option.value =  pokemons[index].name;
option.innerText = pokemons[index].name;
pokemonSelector.append(option);
}
})
.catch(error => console.error(error));



//funcion para mostrar las imagenes del pokemon segun su nombre
function mostrarPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
        const pokemonsprite = data.sprites.other['official-artwork'].front_default
        imgPokemon.src= pokemonsprite
    })
    .catch(error => console.error(error));

}
//token
const token = localStorage.getItem('token');
console.log(token)

//funcion devuelve los pokemons favoritos
async function getFavoritos(token) {
  const response = await fetch(`http://localhost:3000/api/usuarios/${token}/favoritos`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

//pokemon favoritos del usuario
let listafavoritos;

getFavoritos(token).then(favoritos => {
  listafavoritos = favoritos;
});
pokemonSelector.addEventListener("change", () => {
  mostrarPokemon(pokemonSelector.value);
  namepokemon.innerText = pokemonSelector.value;
  actualizarPokeball();
});
//funcion para agregar pokemon a favoritos
async function agregarPokemonFavorito(userId, pokemon) {
    const response = await fetch(`http://localhost:3000/api/usuarios/${userId}/favoritos/${pokemon}`, {
      method: 'POST',
    });
    const updatedUser = await response.json();
    return updatedUser;
  }

//Funcion para actualizar la imagen de pokeball si es favorito o no
function actualizarPokeball() {
  if (listafavoritos.includes(pokemonSelector.value)) {
    imgpokeball.style.display = "block";
  } else {
    imgpokeball.style.display = "none";
  }
}  
  
//Agregar pokemon a favoritos
btnAgregarFavorito.addEventListener("click",()=>{
  agregarPokemonFavorito(token, pokemonSelector.value).then(() => {
    getFavoritos(token).then(favoritos => {
      listafavoritos = favoritos;
      actualizarPokeball();
    });
  });
});