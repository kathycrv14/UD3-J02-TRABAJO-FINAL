//Pokemon Favorites
const containerpokemon = document.getElementById("containerpokemon")
const token = localStorage.getItem('token');

//funcion para obtener los pokemon favoritos
async function getFavoritos(token) {
    const response = await fetch(`http://localhost:3000/api/usuarios/${token}/favoritos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  // obtener datos del pokemon
  async function obtenerdatosdepokemon(pokemon) {
    let datosPokemon; // Declarar objeto "datosPokemon" fuera del bloque "try"
    try {
      // Hacer petición a la API de PokeAPI para obtener información del pokemon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();
  
      // Almacenar datos del pokemon en variables
      datosPokemon = { // Asignar valores al objeto "datosPokemon"
        numero: data.id,
        imagenIcono: `img/${data.types[0].type.name}.png`,
        sprites: data.sprites.other['official-artwork'].front_default,
        nombre: data.name,
        moves: [`${data.moves[0].move.name}`,`${data.moves[1].move.name}`],
        tipo: data.types[0].type.name
      };
    } catch (error) {
      console.error(error);
    }
    return datosPokemon; // Devolver objeto "datosPokemon"
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  async function mostrarDatosPokemon(pokemon) {
    // obtenemos los datos del pokemon
    const datosPokemon = await obtenerdatosdepokemon(pokemon);
    
    const cardPokemon = crearCardPokemon(
      `${datosPokemon.numero}`,
      datosPokemon.imagenIcono,
      datosPokemon.sprites,
      datosPokemon.nombre,
      datosPokemon.moves,
      datosPokemon.tipo
    );
  
    // Eliminar evento de click anterior del botón de eliminar
    const botonEliminar = cardPokemon.querySelector(".buttonEliminar");
    botonEliminar.removeEventListener("click", () => {
      // Eliminar pokémon de la lista de favoritos
      eliminarPokemonDeFavoritos(token, datosPokemon.nombre);
  
      // Eliminar tarjeta de pokémon de la pantalla
      cardPokemon.remove();
    });
  
    // Añadir evento de click al botón de eliminar
    botonEliminar.addEventListener("click", () => {
      // Eliminar pokémon de la lista de favoritos
      eliminarPokemonDeFavoritos(token, datosPokemon.nombre);
  
      // Eliminar tarjeta de pokémon de la pantalla
      cardPokemon.remove();
    });
  
    // Añadir tarjeta de pokémon al contenedor
    containerpokemon.appendChild(cardPokemon);
  }
  
  
  
  let listafavoritos;

  getFavoritos(token).then(favoritos => {
    listafavoritos = favoritos;
    for (let i = 0; i < listafavoritos.length; i++) {
        mostrarDatosPokemon(listafavoritos[i])
      }
  });
    
  


  
 function crearCardPokemon(numero,imagenicono,imgpoke, nombre, ataques=[],tipo) {
     // Crear elementos HTML
        const cardPokemon = document.createElement("section");
        cardPokemon.classList.add("col-12", "col-lg-4", "col-xl-3",`pokemons-${tipo}`);
      
        const fila1 = document.createElement("section");
        fila1.classList.add("row", "sectionNumeroeIcono");
      
        const columnaNumero = document.createElement("section");
        columnaNumero.classList.add("col-6", "sectionNumero");
        const numeroPokemon = document.createElement("h5");
        numeroPokemon.classList.add("numeroPokemon");
        numeroPokemon.innerText = `#${numero}`;
        columnaNumero.appendChild(numeroPokemon);
      
        const columnaIcono = document.createElement("section");
        columnaIcono.classList.add("col-6", "sectionIcono");
        const imagenIcono = document.createElement("img");
        imagenIcono.classList.add("imagenIconoTipo");
        imagenIcono.src = imagenicono;
        columnaIcono.appendChild(imagenIcono);
      
        fila1.appendChild(columnaNumero);
        fila1.appendChild(columnaIcono);
      
        const fila2 = document.createElement("section");
        fila2.classList.add("row");
      
        const columnaImagen = document.createElement("section");
        columnaImagen.classList.add("col-12", "sectionImagenPokemon");
        const imagenPokemon = document.createElement("img");
        imagenPokemon.classList.add("imgPokemon");
        imagenPokemon.src = imgpoke;
        columnaImagen.appendChild(imagenPokemon);
      
        const columnaNombre = document.createElement("section");
        columnaNombre.classList.add("col-12", "sectionNombrePokemon");
        const nombrePokemon = document.createElement("h2");
        nombrePokemon.classList.add("nombrePokemon");
        nombrePokemon.innerText = nombre;
        columnaNombre.appendChild(nombrePokemon);
      
        fila2.appendChild(columnaImagen);
        fila2.appendChild(columnaNombre);
      
        const fila3 = document.createElement("section");
        fila3.classList.add("row");
      
        const columnaAtaques = document.createElement("section");
        columnaAtaques.classList.add("col-6", "sectionAtaque");
        const ataque1 = document.createElement("p");
        ataque1.innerText = ataques[0];
        const ataque2 = document.createElement("p");
        ataque2.innerText = ataques[1];
    columnaAtaques.appendChild(ataque1);
    columnaAtaques.appendChild(ataque2);

    const columnaButton = document.createElement("section");
    columnaButton.classList.add("col-6", "sectionButton");

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("buttonEliminar");
    botonEliminar.innerText = "X";
    columnaButton.appendChild(botonEliminar);

    /* const button = document.createElement("button");
    button.type = "submit";
    button.classList.add("buttonEliminar");
    button.innerText = "X";
    columnaButton.appendChild(button); */

    fila3.appendChild(columnaAtaques);
    fila3.appendChild(columnaButton);

    // Agregar elementos a la tarjeta de pokemon
    cardPokemon.appendChild(fila1);
    cardPokemon.appendChild(fila2);
    cardPokemon.appendChild(fila3);

    return cardPokemon;
}


function eliminarPokemonDeFavoritos(token, nombrePokemon) {
  console.log(`Eliminando pokémon "${nombrePokemon}" de la lista de favoritos...`);
  fetch(`http://localhost:3000/api/usuarios/${token}/favoritos/${nombrePokemon}`, {
    method: 'DELETE'
  })
  .then(response => {
    console.log(`Pokémon "${nombrePokemon}" eliminado de la lista de favoritos`);
    return response.json();
  })
  .then(data => {
    
  })
  .catch(error => {
    console.error(`Error eliminando pokémon "${nombrePokemon}" de la lista de favoritos: ${error}`);
  });
}
const btnEliminar = document.querySelectorAll(".buttonEliminar");

btnEliminar.forEach(botonEliminar => {
  botonEliminar.addEventListener("click", () => {
    // Obtener el nombre del pokémon y el elemento padre de la tarjeta
    const nombrePokemon = botonEliminar.parentNode.parentNode.querySelector(".nombrePokemon").innerText;
    const padre = botonEliminar.parentNode.parentNode.parentNode;

    // Eliminar el pokémon de la lista de favoritos y eliminar la tarjeta del DOM
    eliminarPokemonDeFavoritos(token, nombrePokemon);
    padre.removeChild(botonEliminar.parentNode.parentNode);
  });
});
      
    
  