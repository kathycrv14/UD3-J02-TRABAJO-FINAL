//Login
async function login(usuario, contraseña) {
    // Crea un cuerpo para la solicitud POST con el nombre de usuario y la contraseña
    const body = { usuario, contraseña };
  
    // Envía la solicitud POST al servidor
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  
    // Obtiene la respuesta del servidor
    const data = await response.json();
  
    // Si el token es false, significa que no se encontró ningún usuario
    if (data.token === false) {
      // Muestra un mensaje de error al usuario
      alert('Nombre de usuario o contraseña incorrectos');
    } else {
      // Si el token no es false, significa que se encontró un usuario
      // Guarda el token de autenticación en el navegador (en el local storage)
      // Redirige al usuario a la página protegida de la aplicación
      saveToken(data.token);
      //redireccion a la pagina de incio
      window.location.href = "pokemonfavorites.html";
    }
  }
  
  //Guardar token de autentificacion
  function saveToken(token) {
    localStorage.setItem('token', token);
  }
  
  //Evento que envia los datos del formulario login
  async function enviarDatosLogin(event) {
    // Evita que el formulario envíe la solicitud y recargue la página
    event.preventDefault();
  
    // Obtiene los valores del nombre de usuario y la contraseña del formulario
    const usuario = document.getElementById('loginusuario').value;
    const contraseña = document.getElementById('logincontraseña').value;
  
    // Llamamos a la función login con los valores del formulario
    const token = await login(usuario, contraseña);
  }
  
  //token
  const token = localStorage.getItem('token');
  

  console.log(token)
  
  