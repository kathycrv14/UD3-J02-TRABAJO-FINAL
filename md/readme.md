Integrantes: 
- DENNYS ARON RUIZ PAREDES
- KATHERINE CRISTINA REYES VEGA
- LILIAN PASHANACE PINEDO 
- BROLIN ERIKSSON LLAMOCCA QUISPE
- LYANG JAZMIN LO CORONADO

Capa de presentación - interacción con el usuario

- Inicio sesión, donde los usuarios ingresan su usuario y contraseña, para ser redirigidos a la página principal, si los campos ingresados con correctos. Caso contrario le aparecerá una notificación de error.

- Registrarse, permite ingresar los campos de "Nombre", "Correo", "Usuario", "Contraseña" y "Confirmar contraseña". Con el fin de crear nuevos usuarios. Despúes de que el usuario se registre, se redirigida a la pantalla de inicio sesión con un mensaje de bienvenida, solo si los datos ingresados son correctos. Caso contrario le saldrá una notificacion de error.

- En la pantalla principal, se visualiza una barra de navegación con los siguientes enlaces: "inicio", "Profile", "Pokemon List" y pokemones favoritos.

- En la pantalla "Profile", se visualizará el perfil del jugador con sus respectivos datos: "Nombre Completo", "Correo Electrónico", "Nombre de usuario" y "Contraseña". Además, el usuario podrá editar sus datos y eliminar su cuenta.

- En la pantalla de "Pokemon List", el usuario visualizará un combo list con todos los pokemones de la primera generación. Al seleccionar uno, aparecerá la foto del pokémon seleccionado. Además, al lado derecho superior, al costado del combo list, hay un botón donde el usuario podrá agregar su pokémon de preferencia a sus favoritos.

- En la pantalla de "Pokemon favoritos", aparecerá todos los pokemones agregados a favoritos, cada uno con sus respectivos iconos y color según su tipo, y sus habilidades.

Capa lógica
- Para el desarrollo del crud en los usuarios presentamos las siguientes funciones:
async function getDatosUsuario(token): La función retorna un objeto con los datros del usuario, se realiza una solicitud HTTP GET a una url en específico usando la librería "fetch", para obtener los datos del usuario. La respuesta se da a traves del método json donde se va a almacenar la variable "data". Se devuelve "nombre", "correo", "usuario y contraseña". Luego definimos la función "getDatosUsuario", la cual obtiene el valor del "token" y luego se llama a la función "getDatosUsuarios", la cúal devuelve una promesa.

- async function actualizarUsuario(id, data): Función para actualizar datos del usuario, se realiza una solicitud HTTP PUT a una url para actualizar los datos de los usuarios. La solicitus incluye un "id" que identifica al usuario y un objeto "data", que contiene los nuevos valores para los campos del usuario. La función devuelve los datos actualizados del usuario una vez que se procesa la respuesta de la solicitud.

-async function eliminarUsuario(id): Función para eliminar usuario, esta función se utiliza para eliminar un usuario de una API REST enviando una solicitud HTTP DELETE y devolviendo un valor booleano indicando si la eliminación se realizó correctamente o no.

Para listar los pokemones 
Se realiza una solicitud HTTP GET a la url del api de pokemon, utilizando la función "fetch". listamos los nombres de los pokemones obtenido del API.

- function mostrarPokemon(name): funcion para mostrar las imagenes del pokemon según su nombre, realiza una solicitud HTTP GET, utilizando "fetch", se establece la propiedad src del elemento del DOM con el id "imgPokemon" con la URL de una imagen de Pokémon, para obtener una imágen de un pokémon específico de la API Pokémon. Luego actualiza la imagen de un elemento del DOM con la imagen obtenida.

Pokémones favoritos

- async function getFavoritos(token): La funcion devuelve los pokemones favoritos, realiza una solicitud HTTP GET con fetch. Luego definimos una variable "listafavoritos", donde le asignamos el valor de la respuesta de la funcion "getFavoritos" cuando se resuelva la promesa. Agregamos un controlador de eventos al elemento del DOM con el id "selectpokemon" para el evento de change, cuando se produce dicho evento, se llama a la función "mostrarPokemon", conjunto con su nombre, id "namepokemon". De esta manera, obtenemos la lista de pokemones favoritos del usuario y luego lo mostramos o lo ocultamos la imagen, en funcion de si el pokémon seleccionado está en la lista de favoritos del usuario o no. 

- async function obtenerdatosdepokemon(pokemon): Obtenemos los datos del pokemon. Se realiza una solicitud HTTP GET para procesar la respuesta y ser almacenada en la variable "listafavoritos". Luego agregamos un controlador de eventos al DOM con el id "selectpokemon", para saber cuando el usuario cambie la selección de pokemon. Cuando esto sucede, llamamos a la función "mostrarPokemon", con el valor seleccionado en el elemento "select", para verificar si el nombre del pokémon seleccionado está en la lista de favoritos del usuario, se muestra o se oculta dependiendo de la actividad del usuario.

- function crearCardPokemon(numero,imagenicono,imgpoke, nombre, ataques=[],tipo, boton): Creamos las cards, tarjetas de los pokemones con sus respectivas caracteristicas y un botón, creamos elementos de seccion HTML y clases CSS, la funcion nos devuelve el elemento de seccion principal. 



Capa de datos
Hemos utilizado la base de datos mongodb para el almacenamientos de la información de usuarios, pokemones, pokemones favoritos.
 

